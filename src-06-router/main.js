/*
入口JS
 */
import Vue from 'vue'

import App from './App.vue'
import router from './router'


new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router, // 注册路由器
})

/*
vue-router给我们提供哪些东西?
1. 1个构造函数: VueRoute
  new VueRouter()
2. 2个对象(所有组件对象都有)
  $route: 当前路由信息对象
  $router: 路由器对象
3. 3个组件
  router-link
  router-view
  keep-alive
 */