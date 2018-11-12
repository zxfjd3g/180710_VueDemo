/*
入口JS
 */
import Vue from 'vue'
import {Button} from 'mint-ui'

import App from './App.vue'

// 全局注册组件==> 所有组件中都可以直接使用这个组件标签
// Vue.component('mt-button', Button)
Vue.component(Button.name, Button)

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
