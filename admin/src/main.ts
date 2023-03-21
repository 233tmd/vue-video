import Vue from 'vue'
import axios from "axios";
import './plugins/avue'
import App from './App.vue'
import './plugins/element'
import router from './router'

// import ElementUI from 'element-ui';
// // 全局引入vue-ele-form
// import EleForm from 'vue-ele-form'       

// // 注册vue-ele-form
// Vue.use(EleForm)
// Vue.use(ElementUI)

Vue.config.productionTip = false

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
Vue.prototype.$http = http // vue的axios
Vue.prototype.$axios = http // avue的axios

new Vue({  
  router,
  render: h => h(App)
}).$mount('#app')
