/*
入口JS
 */
import Vue from 'vue'
import App from './App.vue'
import './index.css'

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})

/*
一个vm管理了多个组件标签
每个组件标签都是一个组件对象
每个组件对象就是一个小/子vm
组件中的模板能直接访问的是组件对象的属性
 */