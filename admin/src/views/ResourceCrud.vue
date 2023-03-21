<template>
    <avue-crud v-if="option.column" :data="data.data" :page="page" :option="option" @row-save="create" @row-update="update"
        @row-del="remove" @on-load="changePage" @sort-change="changeSort" @search-change="search"></avue-crud>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceCrud extends Vue {
    @Prop(String) resource: string | undefined
    data: any = {}
    option: any = {}
    page: any = {
        pageSize: 3, // 初始每页展示限制
        pageSizes: [3, 6, 9], // 每页展示限制选项
        total: 114514, // 任意值，反正会获取从mongoDB传过来的total
    }
    query: any = {
        // limit: 3, // 每页展示限制
        // sort: { _id: -1 } // 倒序排序
    }

    // 查询数据结构创建列表结构
    async fetchOption() {
        const res = await this.$http.get(`${this.resource}/option`)
        this.option = res.data
    }

    // 查询数据创建列表
    async fetch() {
        const res = await this.$http.get(`${this.resource}`, {
            params: {
                query: this.query
            }
        })
        this.page.total = res.data.total // 数据总数
        this.data = res.data
    }

    // 分页展示切换
    async changePage({ pageSize, currentPage }) {
        this.query.page = currentPage
        this.query.limit = pageSize
        this.fetch()
    }

    // 排序功能，按名称升降排序或取消排序
    async changeSort({ prop, order }) {
        if (!order) {
            this.query.sort = null // order为空，不排序
        } else {
            this.query.sort = {
                // order为ascending则为升序，否则为descending降序
                [prop]: order === 'ascending' ? 1 : -1
            }
        }
        this.fetch()
    }

    // 新增功能
    async create(row, done, loading) {
        await this.$http.post(`${this.resource}`, row)
        this.$message.success('创建成功！')
        this.fetch() // 重新获取数据创建列表
        done() // 加载完成立即关闭窗口
        // loading() // 加载完成不关闭窗口，需要手动关闭
    }

    // 删除功能
    async remove(row) {
        try {
            await this.$confirm('确认删除？')
        } catch (e) {
            return
        }
        await this.$http.delete(`${this.resource}/${row._id}`)
        this.$message.success('删除成功！')
        this.fetch() // 重新获取数据创建列表
    }

    // 修改功能
    async update(row, index, done, loading) {
        // avue在执行update时会给row添加$index索引，但是mongoDB无法识别$index，会导致修改进程停止在await，无法往下执行。
        const data = JSON.parse(JSON.stringify(row)) // 拷贝row到data
        delete data.$index // 删除$index
        await this.$http.put(`${this.resource}/${row._id}`, data)
        this.$message.success('更新成功！')
        this.fetch() // 重新获取数据创建列表
        done() // 加载完成立即关闭窗口
        // loading() // 加载完成不关闭窗口，需要手动关闭
    }

    // 搜索功能
    async search(where, done) {
        // console.log(where)
        // this.query.where = where // 精准查询

        // where.name = { $regex: where.name } // 正则表达式实现模糊查询，即查询正则表达式包含的字段
        // this.query.where = where
        
        for (let k in where) { // 遍历数据
            const field = this.option.column.find((v: { prop: string; }) => v.prop === k) // 找到同名的列
            if (field.regex) { // 判断该列有无regex的属性
                where[k] = { $regex: where[k] } // 将查询条件变为regex的模糊查询
            }
        }
        this.query.where = where
        this.fetch()
        done()
    }

    created() {
        this.fetchOption()
        this.fetch()
    }
}
</script>

<style>
.cell>span {
    overflow: hidden;
    white-space: nowrap;
}
</style>