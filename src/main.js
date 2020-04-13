/* 
入口JS
*/
import Vue from 'vue'
import "swiper/css/swiper.min.css";


import App from './App'
import router from './router'
import TypeNav from './components/TypeNav'
import store from "./store";
import "./mock/mockServer";
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'



Vue.config.productionTip = false;
// 注册全局组件
Vue.component('TypeNav', TypeNav) 
Vue.component('Carousel', Carousel) 
Vue.component('Pagination', Pagination) 


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // el: '#app'
  render: h => h(App),  // 将App组件对象渲染到页面上
  router, // 配置路由器
  store,
}).$mount('#app')