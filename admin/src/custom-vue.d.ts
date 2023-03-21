// 1. 确保在声明补充类型之前导入'vue
import { AxiosInstance } from 'axios'
// 2. 定制一个文件，设置你想要补充的类型
// 在types/vue.d.ts里vue有构造函数类型
declare module 'vue/types/vue' {
  // 3. 声明为vue补充的东西
  interface Vue {
    $http: AxiosInstance
  }
}