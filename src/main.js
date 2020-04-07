/* 
入口JS
*/
import Vue from 'vue'
import App from './App'
import router from './router'
import TypeNav from './components/TypeNav'
import store from "./store";


// 注册全局组件
Vue.component('TypeNav', TypeNav) 

new Vue({
  // el: '#app'
  render: h => h(App),  // 将App组件对象渲染到页面上
  router, // 配置路由器
  store,
}).$mount('#app')