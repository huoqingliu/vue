/* 
所有路由配置的数组模块
*/
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/Detail/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'


export default [
  {
    path: '/',
    component: Home
  },

  {
    name: 'search', // 如果是params参数需要指定此名称
    path: '/search/:keyword?', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Search,
    // 将query/params参数映射成props传递给路由组件
    props: (route) => ({ keyword1: route.params.keyword, keyword2: route.query.keyword })
  },

  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true, // 标识footer是否隐藏
    }
  },

  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true, // 标识footer是否隐藏
    }
  },

  {
    name: 'detail', // 如果是params参数需要指定此名称
    path: '/detail/:skuId', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Detail,
  },
  {
    name: 'addCartSuccess', // 如果是params参数需要指定此名称
    path: '/addCartSuccess', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: AddCartSuccess,
  },
  {
    name: 'shopCart', // 如果是params参数需要指定此名称
    path: '/shopCart', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: ShopCart,
  }
]