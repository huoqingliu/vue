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
import Center from '@/pages/Center'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Trade from '@/pages/Trade'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'



export default [{
    name: 'home',
    path: '/',
    component: Home
  },

  {
    name: 'search', // 如果是params参数需要指定此名称
    path: '/search/:keyword?', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Search,
    // 将query/params参数映射成props传递给路由组件
    props: (route) => ({
      keyword1: route.params.keyword,
      keyword2: route.query.keyword
    })
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
    },
    // beforeEnter:(to,form,next)=> {
    //   if (store.state.user.userInfo.name) {
    //     next('/')
    //   } else {
    //     next()
    //   }
    // }
  },

  {
    name: 'detail', // 如果是params参数需要指定此名称
    path: '/detail/:skuId', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Detail,
  },
  {
    name: 'shopCart', // 如果是params参数需要指定此名称
    path: '/shopCart', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: ShopCart,

  },
  {
    name: 'addCartSuccess', // 如果是params参数需要指定此名称
    path: '/addCartSuccess', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      const {
        skuId,
        skuNum
      } = to.query
      const skuInfo = JSON.parse(window.localStorage.getItem('SKU_INFO_KEY'))
      if (skuId && skuNum && skuInfo) {
        next()
      } else {
        next(from.path)
      }
    }
  },
  {
    name: 'center', // 如果是params参数需要指定此名称
    path: '/center', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Center,
    redirect: '/center/myOrder',
    children: [{
        name: 'myOrder',
        path: 'myOrder',
        component: MyOrder,
      },
      {
        name: 'groupBuy',
        path: 'groupBuy',
        component: GroupBuy,
      }
    ]
  },
  {
    name: 'pay', // 如果是params参数需要指定此名称
    path: '/pay', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Pay,
    props: route => ({orderId: route.query.orderId}),
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf('/trade') === 0) {
        next()
      } else {
        next('/trade')
      }
    }
  },
  {
    name: 'paySuccess', // 如果是params参数需要指定此名称
    path: '/paySuccess', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf('/pay') === 0) {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    name: 'trade', // 如果是params参数需要指定此名称
    path: '/trade', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf('/shopCart') === 0) {
        next()
      } else {
        next(from.path)
      }
    }
  }
]