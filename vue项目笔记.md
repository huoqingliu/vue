## 一、oneday

###` this.$router`和`this.$route`的区别

    this.$router: 得到的是路由器对象(包含跳转路由的一些方法)
    this.$route: 得到的是当前路由信息对象(包含的是当前路由的相关数据属性: path/params/query/meta)



### **`Footer`组件**

  如何控制`footer`/`header`组件在部分路由组件上不显示?

  利用路由的`meta`配置:

   ```
meta:{
   isHideFooter: true, // 标识footer是否隐藏
}


<Footer v-if="!$route.meta.isHideFooter"/>
   ```





### **`Home`组件**

  `Home`静态路由组件

  从`Home`组件中抽取各个子组件并使用

​    全局组件

​    局部组件



<hr>
### 	一些面试问题


1. #### **问题1：`gationDuplicated`的错误**

   #####      方案1: 在跳转时指定成功或失败的回调函数，//但是不如第二个方法

           this.$router.push('/search', () => {  // 可以
              console.log('跳转成功')
           }) 
           this.$router.push('/search').then(() => {})  // 不可以
           this.$router.push('/search', undefined, () => {})  // 可以
           this.$router.push('/search').catch(() => {}) // 可以

   ​    

   ##### 方案2: 修正Vue原型上的push和replace方法 (优秀)

   ```
//router下的index.js页面
   VueRouter.prototype.push = function (location, onComplete = () => {}, onAbort) {
     return originPush.call(this, location, onComplete, onAbort)
   }
   
   VueRouter.prototype.replace = function (location, onComplete, onAbort) {
     return originPush.call(this, location, onComplete, onAbort).catch(() => {})
   }
   ```
   
   

2. #### **问题2: 如何指定params参数可传可不传?**

       ```
   path: '/search/:keyword?'//在参数后方加一个？
       ```

   

3. #### **问题3:指定`params`参数时可不可以用`path`和`params`配置的组合?**

   ​    **不可以用`path`和`params`配置的组合**

   ​    **只能用`name`和`params`配置的组件**

   

4. #### 问题4: 如果指定`name`与`params`配置, 但`params`中数据是一个"", 地址栏路径有问题

   ​    **如果有参数数据, 指定params**

   ​    **如果没有参数数据, 不指定params**

   

5. ####  面试问题: 路由组件能不能传递`props`数据?

   ​    可以: 可以将query或且params参数映射/转换成props传递给路由组件对象

   ​    实现:

   ```
    props: (route) => ({ keyword1: route.params.keyword, keyword2: route.query.keyword })
    
    在路由组件中使用props声明接收
    props:['keyword1', 'keyword2']
   ```



## 二、`twoday`

### **1.`postman`测试接口**

  1). 启动 == > 选择登陆 ==> cancel  == > 进入主界面

  2). 输入url/参数进行请求测试

  3). 注意`post`请求体参数需要指定为`json`格式

  4). 保存测试接口 ==> 后面可以反复使用



### **2. `ajax`与后台交互**

1. ####  对`axios`进行二次封装

   ​	1. 配置通用的**基础路径**和**超时**

   ​    2. 显示请求进度条

   ​	3.成功返回的数据不再是`response`, 而直接是响应体数据`response.data`

   ​	4.统一处理请求错误, 具体请求也可以选择处理或不处理    

   ```
   import axios from "axios";
   import NProgress from 'nprogress'
   import 'nprogress/nprogress.css'
   
   const ajax = axios.create({
     baseURL: '/api',
     timeout: 20000,
   })
   
   // 请求拦截器
   ajax.interceptors.request.use((config) => {
     // 显示请求进度条
     NProgress.start()
   
     // 必须返回config
     return config
   })
   
   // 添加响应拦截器
   ajax.interceptors.response.use(
     response => {
       // 隐藏进度条
       NProgress.done()
       /*  成功返回的数据不再是response, 而直接是响应体数据response.data */
       return response.data
     },
     error => {
       // 隐藏进度条
       NProgress.done()
   
       alert('请求出错: ' + error.message||'未知错误')
   
       // return new Promise(() => {})  // 中断promise链 ==> 具体请求就不能再处理了  
       return Promise.reject(error) // 返回失败的promise ==> 具体请求可以处理
     }
   )
   
   export default ajax
   ```

   

   

2. ####   定义接口请求函数

   ​	1.内部调用`ajax`函数

   ​    2.函数的返回值是`promise`

   ```
   import ajax from "./ajax";
   
   // 获取3级列表
   export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
   // 登录
   export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password}) 
   ```

   

   

3. ####    调用接口请求函数发请求

   ​    使用async/await简化promise的使用

   ```
   async mounted() {
       const reult = await reqBaseCategoryList()
     }, 
   ```

   

   

4. ####  配置代理解决跨域问题

   ​    在vue.config.js中配置
   
   ```
   module.exports = {
     lintOnSave: false, // 直接关闭eslint检查
     // lintOnSave: 'warning', // 只是输出提示信息, 项目正常运行
     devServer: {
       proxy: {
         '/api': { // 只对请求路由以/api开头的请求进行代理转发
           target: 'http://182.92.128.115', // 转发的目标url
           changeOrigin: true // 支持跨域
         }
       }
     }
   }
   ```
   
   



###  3. 引入vuex并使用

  1). 下载`vuex`

`npm install -S vuex`

  2). `vuex`的基本使用

  3). `vuex`多模块编程

​    什么时候用? 当vuex管理的**数据个数很多时**

​    好处: 每个功能模块的数据单独管理, 更方便, 更有扩展性

  4). `vuex`多模块编程的总state结构

   ```
{
   user: {
    	userInfo: {}
   },
   home: {
        baseCategoryList: []
   }
}
   ```

**注：vuex的index中mutations,actions,getters管理的是总state**

**module中的mutations,actions,getters管理的是当前state**

```
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules

})这里的mutations,actions,getters管理的是总的state


而在modules的单独module中，操作的时当前模块的state
const state = {
  userInfo:{}
}
const mutations = {

}
const actions = {

}
const getters = {

}

```





### 4. TypeNav组件

#####   1). 组件与vuex交互, 动态显示3级分类

​       	**使用v-for获取数据**			

```
<div class="item"  v-for="(c1, index) in categoryList" :key="c1.categoryId" >
	<div class="item"  v-for="(c2, index) in c1" :key="c2.categoryId" >
		<div class="item"  v-for="(c3, index) in c2" :key="c3.categoryId" >
		
		</div>
   </div>
</div>

```



#####   2). 控制2/3级分类列表的显示与隐藏

```
定义 currentIndex: -1

当鼠标放在列表上时，为当前列表添加item_on类
<div class="item"  v-for="(c1, index) in categoryList" :key="c1.categoryId"
:class="{item_on: index===currentIndex}" @mouseenter="currentIndex=index" >

```



#####   3). 点击某个分类项, 跳转到search路由: /search?categoryName=电子书刊&category2Id=1

​    categoryName: xxx

​    category1Id: 1级分类ID

​    category2Id: 2级分类ID

​    category3Id: 3级分类ID



方法：（**暂时使用**）

**创建路由跳转标签，点击标签跳转到search路由**

  ```
<router-link :to="{path: '/search', query: {categoryName: c1.categoryName, category1Id: c1.categoryId}}">{{c1.categoryName}}</router-link>

  ```

