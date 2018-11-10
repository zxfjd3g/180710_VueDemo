/*
入口JS
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'

Vue.use(VueResource) // 内部给所有的vm和组件对象添加了一个$http的属性对象, 可能通过其get()/post()发ajax请求

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
