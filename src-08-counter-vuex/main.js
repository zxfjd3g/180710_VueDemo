/*
入口JS
 */
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store, // 配置store==> 所有组件对象都多了一个属性: $store
})
