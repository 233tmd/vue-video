<template>
    <div>
        <h3>{{ isNew ? '创建' : '编辑' }}课程</h3>
        <ele-form
         :form-data="data"
         :form-desc="fields"
         :request-fn="submit"
        ></ele-form>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CourseEdit extends Vue {
    @Prop(String) id!:string
    data = {}
    fields = {
        name: { label: '课程名称', type: 'input' },
        cover: { label: '课程封面图', type: 'input' },
    }

    // 将方法当成计算属性使用
    get isNew(){
        return !this.id
    }

    async fetch(){
        const res = await this.$http.get(`courses/${this.id}`)
        this.data = res.data
    }

    async submit(data: any) {
        // console.log(data);
        const url = this.isNew ? `courses` : `courses/${this.id}` // 创建或编辑的请求url
        const method = this.isNew ? 'post' : 'put' // 创建或编辑的请求方法
        // 调用后端的管理API创建或编辑课程
        await this.$http[method](url, data)
        this.$message.success('保存成功！') // 提示信息
        // 提交之后清空页面数据
        this.data = {}
        this.$router.go(-1) // 返回上一页面
    }

    created(){
        !this.isNew && this.fetch() // 判断数据是否为新，旧数据则为编辑，新数据则为创建
    }
}
</script>

<style>

</style>