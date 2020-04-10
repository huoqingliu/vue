## 一、one-day

### ` this.$router`和`this.$route`的区别

```
this.$router: 得到的是路由器对象(包含跳转路由的一些方法)
this.$route: 得到的是当前路由信息对象(包含的是当前路由的相关数据属性: path/params/query/meta)
```



### `Footer`组件

  如何控制`footer`/`header`组件在部分路由组件上不显示?

  利用路由的`meta`配置:

   ```
meta:{
   isHideFooter: true, // 标识footer是否隐藏
}


<Footer v-if="!$route.meta.isHideFooter"/>
   ```



### 编程式路由

```
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```



### **`Home`组件**

  `Home`静态路由组件

  从`Home`组件中抽取各个子组件并使用

​    全局组件

​    局部组件



<hr>

### 	 一些面试问题

1. #### **问题1：`gationDuplicated`的错误**

   #####      方案1: 在跳转时指定成功或失败的回调函数，//但是不如第二个方法

   ```
   this.$router.push('/search', () => {  // 可以
   console.log('跳转成功')
   }) 
   this.$router.push('/search').then(() => {})  // 不可以
   this.$router.push('/search', undefined, () => {})  // 可以
   this.$router.push('/search').catch(() => {}) // 可以
   ```

   

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

       path: '/search/:keyword?'//在参数后方加一个？
   

   
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



## 二、`two-day`

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



**方法一**：（不推荐）

**创建路由跳转标签，点击标签跳转到search路由**

  ```
<router-link :to="{path: '/search', query: {categoryName: c1.categoryName, category1Id: c1.categoryId}}">{{c1.categoryName}}</router-link>
  ```

**方法二**：

**给父元素绑定事件监听toSearch，并在监听中调用`push()`方法。利用事件委托，使所有组件都能触发该监听**

```
toSearch(event) {
    console.dir(event.target);
    // 得到所有标签上的data自定义属性
    const dataset = event.target.dataset;
    console.log("dataset", dataset);
    const { categoryname, category1id, category2id, category3id } = dataset;
    console.log("category1id", category1id);

    if (categoryname) {
        const query = { categoryName: categoryname };
        if (category1id) {
        query.category1Id = category1id;
        } else if (category2id) {
        query.category2Id = category2id;
        } else if (category3id) {
        query.category3Id = category3id;
        }
        this.$router.push({ path: "/search", query });
        // console.log("query", query);
    }
}
```



## 三、`three-day`

#### `TypeNav`动态组件

1. #### 利用`lodash`库对高频触发的事件进行函数节流处理

   1). 理解区别函数节流与函数防抖(面试问题)
   2). 使用`lodash`进行函数节流与防抖编码处理
   3). 使用`lodash`对子列表显示切换进行节流处理

   

2. #### 对`lodash`库实现按需引入, 减小打包文件

   1). 只引入要用的工具函数, 实现对`lodash`实现按需引入打包
   2). 好处: 减小打包文件, 访问更快

   

3. #### 利用事件委托, 优化事件处理效率

   1). 给多个需要绑定事件的元素的共同父元素绑定事件监听
   2). 在事件回调函数中取出发生事件的元素: `event.target`
   3). 判断此元素是多个目标元素中的某个才进行处理

   ```
   toSearch(event) {
       console.dir(event.target);
       // 得到所有标签上的data自定义属性
       const dataset = event.target.dataset;
       console.log("dataset", dataset);
       const { categoryname, category1id, category2id, category3id } = dataset;
       console.log("category1id", category1id);
   
       if (categoryname) {
           const query = { categoryName: categoryname };
           if (category1id) {
           query.category1Id = category1id;
           } else if (category2id) {
           query.category2Id = category2id;
           } else if (category3id) {
           query.category3Id = category3id;
           }
           this.$router.push({ path: "/search", query });
           // console.log("query", query);
       }
   }
   ```

   

4. #### 利用标签自定义属性携带动态数据

   1). 在发生事件的标签指定以`data-xXX`开头的属性

   ```
   <a href="javascript:" 
   :data-categoryName="c1.categoryName"
   :data-category1Id="c1.categoryId"
   >{{c1.categoryName}}</a>
   ```

   

   2). 在事件回调函数通过`event`得到标签, 从而取出自定义属性值
    ` const value = event.target.dataset.xxx`
     注意: xxx是全小写的  ===> 当前得到2个属性: `categoryname / category3id`

   ```
   //得到所有标签上的data自定义属性
   const dataset = event.target.dataset
   // 取出自定义属性值
   const {categoryname, category1id, category2id, category3id} = dataset
   ```

   

   

5. 
   ### 控制1级列表的显示与隐藏

   1). 需要一个控制一级列表显示的状态数据: `isShowFirst`

   ```
   isShowFirst: true
   ```

   

   2). 在首页一直显示, 在搜索页面默认是隐藏的: 
       在mounted()中根据根据当前请求的路径判断, 如果是不是首页隐藏
       在mounseleve中  ==> 如果当前不是首页,隐藏一级列表

   ```
   mounted () {
       // 得到当前路由路径
       const path = this.$route.path
       // 如果不在首页指定隐藏一级分类列表
       if (path!='/') {
       this.isShowFirst = false
       }
   },
   ```

   

   

6. ### 优化请求执行的位置, 减少请求次数

   问题: 切换路由组件会发多次获取分类列表的请求?
   原因: 触发请求的代码写在TypeNav组件中, 每渲染一次, 就会发一次请求
   解决: 触发请求的代码写在App中就可以

   ```
   async mounted () {
       // const result = await reqBaseCategoryList()
       // console.log('result', result)
   
       // 触发vuex中的getBaseCategoryList action调用 ==> 的切换路由时不会执行 ==> 只发一次请求
       this.$store.dispatch('getBaseCategoryList')
     },
   ```

   

   

7. ### `mock`数据接口

   问题: 首页只有分类列表的接口, 其它数据的接口还没有写好, 咋办?
   解决: 自己`mock`数据接口

   

   1. #### 设计`json`数据

      **例：**

      ```
      [{
          "id|1-3": "1",
          "imgUrl": "/images/banner1.jpg"
        },
        {
          "id": "2",
          "imgUrl": "/images/banner2.jpg"
        },
        {
          "id": "3",
          "imgUrl": "/images/banner3.jpg"
        },
        {
          "id": "4",
          "imgUrl": "/images/banner4.jpg"
        }
      ]
      ```

      **注: mock数据和真实数据相比：结构一致，值可变**
      
      


   2. #### 如何实现`mock`?

      **主要使用 `Mockjs` 用来拦截ajax请求, 生成随机数据返回**

       **下载安装:**

      ```
      npm install -S mockjs
      ```

      

      ##### 1、定义`mockServer.js`，并在`main.js`中引入

      ```
      ****mockServer.js****
      
      import Mock from 'mockjs'
      import banners from "./banners.json";
      import floors from "./floors.json";
      
      //返回mock数据
      Mock.mock('/mock/banners', { code: 200, data: banners })
      Mock.mock('/mock/floors',{code:200,data:floors})
      
      
      // 不需要使用export向外暴露,但必须要必须执行一次  才能访问2个mock的接口
      //在main.js中引入
      // console.log('mockServer加载了');
      ****main.js****
      import './mock/mockServer' // 加载mock接口的主模块
      ```

      

      ##### 2、在modules中定义一个module，用来获取`mock`数据。并接收保存

      ```
      /* 
      用于操作首页模块数据的vuex模块
      */
      import {reqBaseCategoryList, reqBanners, reqFloors} from '@/api'
      
      const state = {
        baseCategoryList: [], // 所有3级分类的数组 
        banners: [], // 广告轮播列表
        floors: [], // 所有楼层列表
      }
      
      const mutations = {
        /* 
        接收保存分类列表
        */
        RECEIVE_CATEGORYS (state, categorys) {
          state.baseCategoryList = categorys.splice(0, categorys.length-2)
        },
      
        /* 
        接收保存广告列表
        */
        RECEIVE_BANNERS (state, banners) {
          state.banners = banners
        },
        /* 
        接收保存楼层列表
        */
        RECEIVE_FLOORS (state, floors) {
          state.floors = floors
        },
      }
      const actions = {
        /* 
        异步获取分类列表
        */
        async getBaseCategoryList ({commit}) {
          // 1. 调用接口请求函数发异步ajax请求
          const result = await reqBaseCategoryList()
          // 2. 得到成功的数据后, 提交给mutation去更新状态
          if (result.code===200) {
            const categorys = result.data
            commit('RECEIVE_CATEGORYS', categorys)
          }
        },
      
        /* 
        异步获取广告轮播列表
        */
        async getBanners ({commit}) {
          // 异步请求获取数据
          const result = await reqBanners()  // {code: 200, data: banners}
          // 成功得到数据后, 提交给mutation
          if (result.code===200) {
            const banners = result.data
            commit('RECEIVE_BANNERS', banners)
          }
        },
      
        /* 
        异步获取所有楼层列表
        */
        async getFloors ({commit}) {
          // 异步请求获取数据
          const result = await reqFloors()  // {code: 200, data: floors}
          // 成功得到数据后, 提交给mutation
          if (result.code===200) {
            const floors = result.data
            commit('RECEIVE_FLOORS', floors)
          }
        },
        
      }
      const getters = {
        
      }
      
      export default {
        state,
        mutations,
        actions,
        getters
      }
      ```

      

      ##### 3、在home路由组件中调用actions里的方法，获取`mock`数据

      ```
      mounted(){
            this.$store.dispatch('getBanners')
            this.$store.dispatch('getFloors')
      },
      ```

   

​    

8. ### 使用`Swiper`来构建轮播图

   #### 1、安装`swiper`

   ```
    npm install swiper -S
   ```

   #### 2、`html`模板

   ```
   <div class="swiper-container">
       <div class="swiper-wrapper">
           <div class="swiper-slide">Slide 1</div>
           <div class="swiper-slide">Slide 2</div>
           <div class="swiper-slide">Slide 3</div>
       </div>
       <!-- 如果需要分页器 -->
       <div class="swiper-pagination"></div>
       
       <!-- 如果需要导航按钮 -->
       <div class="swiper-button-prev"></div>
       <div class="swiper-button-next"></div>
       
       <!-- 如果需要滚动条 -->
       <div class="swiper-scrollbar"></div>
   </div>
   ```

   

   #### 3、script模板

   ```
   var mySwiper = new Swiper ('.swiper-container', {
       direction: 'vertical', // 垂直切换选项
       loop: true, // 循环模式选项
       
       // 如果需要分页器
       pagination: {
         el: '.swiper-pagination',
       },
       
       // 如果需要前进后退按钮
       navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       },
       
       // 如果需要滚动条
       scrollbar: {
         el: '.swiper-scrollbar',
       },
     })        
   ```

   ##### 注：这些script代码必须写在页面加载完成之后

   **比如：写在页面html加载完成之后**

   ```
   <script>
   window.onload = function() {
     ...
   }
   </script>
   ```

   **又或者：写在生命周期钩子`mounted`中**

   ```
    mounted() {
    	···
    }
   ```





## 四、`four-day`



1. ### 使用`swiper`库实现静态轮播图效果的一些问题

   ##### 问题: 创建的`swiper`会对其它组件界面中的swiper界面产生影响

   ##### 原因: `new Swiper('.swiper-container')`, 类选择会匹配上页面中的所有此类名元素, 就会都产生效果

   ##### 解决: 使用`vue`技术来定义`swiper`的根元素

   **给swiper的根元素标签添加`ref="swiper"`**

   ```
   <div class="swiper-container" ref="swiper">
   ```

   **使用`vue`技术来定义`swiper`的根元素**

   ```
   new Swiper(this.$refs.swiper, {
   	··· 
   })
   ```

   

   

   

2. ### 使用swiper库实现动态轮播图效果

   ​	动态获取数据并显示到轮播页面中

     如果在mouted()中创建swiper对象, 轮播有问题

       原因: banners数据是异步获取, 而mounted很早就执行了, 创建swiper对象是在列表数据显示之前
       
       解决方案1: 定时器延迟一定时间执行 ==>此方案不可用
       
         延迟的时间不太能确定, 因为请求返回数据的时间不确定
       
       解决方案2: watch + $nextTick ==>此方案不可用
       
         通过watch就能知道banners数据发生了改变 [] ==> [{}, {}]
       
         通过$nextTick(callback)能知道界面因为这个数据发生改变而更新
       
       解决方案3: callback + $nextTick  后面合适时机再说
   
3. ### 抽取可复用的轮播组件`Carouse`

   #### 组件`Carouse`

   ##### 将`ListContainer`中`swiper`的模板页面和JS部分拿过来

   #####   定义接收轮播数组数据: `carouselList`, 并显示

   #####   在`ListContainer`和`Floor`组件中使用`Carousel`: 

   ```
   <Carousel :carouselList="array">
   ```

   

   

   ####   为什么`Foor`组件中的轮播有问题?

   ##### v-for遍历的如果是**空数组**, 不会渲染组件标签

   

   `floors`开始是[] ==> 初始**显示没有渲染`Foor`组件** ==> **没有渲染它内部的`Carousel`** ==> **没有创建`Carousel`对象**

   

   后面异步获取了`foors`数组([{}, {}])  == > **渲染2个`Floor`** == > 渲染2个它内部的`Carousel `== > 创建`Carousel`对象 ===> 调用`mounted()`, 有数据的长为3

   **此时没有更新的过程 ==> 不会执行watch的回调**

   

   ####   为什么`ListContainer`中的没问题?

   `banners`为空数组 == > 渲染`Carousel `== > 创建`Carousel`, 调用`mounted`, 没有数据(长度为0)

   异步获取`banners`数组 == > **更新渲染`Carousel`** ===> **调用`watch`的回调函数**

   

   ###   解决办法:

   **利用watch的immediate: true**

   **在初始显示时就立即执行一次, 默认是false(只有数据改变才立即执行)**

   

   ####   导致新的执行效率问题?

   **问题: `ListContainer`中的轮播的`swiper`对象多创建了**

   **解决: 只有当数组中有数据才创建:**

   ```
   if (this.carouselList.length===0) return
   ```




## 五、five-day

### ajax + vuex

#### 在组件中动态显示: 品牌列表 + 属性列表 + 商品列表

#### 根据分类和关键字进行搜索

基本实现
	1). 分类搜索参数: query参数 categoryName / category1Id / category2Id / category3Id
	2). 关键字搜索参数: params参数 keyword
	3). Search组件得到分类/关键字参数并发搜索请求
		mounted() 中处理     从首页跳转到搜索
		watch ==> $route()   在搜索页改变分类或关键字
		利用...合并多个参数数据
功能bug: 
	问题1描述:
		在搜索页面, 再改变分类或改变关键时, 参数携带有问题
		本来有分类条件 ==> 指定关键字条件  ==> 分类条件就会丢失
		本来有关键字条件 ==> 指定分类条件 ==> 关键字条件就会丢失
	原因:
		根据分类跳转时, 没有携带包含keyword的params参数
		根据关键字进行跳转时, 没有携带包含分类数据的query参数
	解决办法
		1). 判断是在搜索界面
		2). 指定需要携带params或者query参数
		3). 指定replace的跳转方式
		

问题2描述:
	切换到另一个级别的分类, 原分类的id数据依然还在
原因:
	没有去重置分类条件数据
解决:
	在$route的监视回调中, 重置options中的分类相关数据