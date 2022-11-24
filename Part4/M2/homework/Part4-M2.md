# 简答题



1. 父传子有哪些方式
    props、全局事件总线、消息订阅与发布、Vuex、插槽


2. 子传父有哪些方式
    自定义事件、全局事件总线、消息订阅与发布、Vuex


3. 如何让 CSS 只在当前组件中起作用
    在style标签中加入scope


4. keep-alive 的作用是什么
    使组件在切换时不被销毁


5. vue中如何获取DOM
    给对应的dom元素添加ref属性通过this.$refs获取


6. 请说出 Vue CLI 项目中src目录每个文件夹的文件的用法
    assets：静态资源
    components：通用模块组件
    utils：公共文件
    views：页面组件
    router：路由配置文件
    store：vuex文件
    App.vue：根组件
    main.js：入口文件


7. 单页面应用的优缺点
    优点：具有桌面应用的及时性网站的可移植和可访问性、用户体验好、服务器相对压力小、良好的前后端分离
    缺点：不利于SEO、首屏加载慢、导航不可用


8. $router和$route的区别
    $router是VueRouter的实例对象包含所有路由和跳转方法钩子等。
    $route是一个路由跳转对象


9.  怎么定义 vue-router 的动态路由? 怎么获取传过来的值？
    在路由路径中使用动态路由参数使用':'标记
    参数设置在this.$router.query 或 this.$router.params中


10. vue-router有几种模式，分别是什么
    hash模式 通过URLhash值实现
    history模式 通过h5提供的history对象实现
