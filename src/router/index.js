/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Message from '../views/Message.vue'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
  // 配置应用中的所有路由
  routes: [
    { // 一级路由
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [ // 子路由
        {
          path: '/home/news',   // 路径左侧的/代表项目根路径
          component: News
        },
        {
          path: 'message',
          component: Message
        },
        {
          path: '',
          redirect: '/home/news'
        }
      ]
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
})