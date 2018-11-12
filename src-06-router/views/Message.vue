<template>
  <div>
    <ul>
      <li v-for="(m, index) in messages" :key="m.id">
        <router-link :to="`/home/message/detail/${m.id}?id=${m.id}`">{{m.title}}</router-link>
        <button @click="pushShow(m.id)">push查看</button>
        <button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <hr>
    <router-view/>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      // 模拟发ajax请求获取列表数据
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 3, title: 'message003'},
          {id: 5, title: 'message005'},
        ]
        // 更新状态数据
        this.messages = messages
      }, 1000)
    },

    methods: {
      pushShow (id) {
        // push()实现路由跳转
        this.$router.push(`/home/message/detail/${id}`)
      },
      replaceShow (id) {
        // push()实现路由跳转
        this.$router.replace(`/home/message/detail/${id}`)
      }
    }
  }
</script>

<style>

</style>