<template>
  <div>
    <ul>
      <li v-for="(m, index) in messages" :key="m.id">
        <router-link :to="`/home/message/detail/${m.id}?id=${m.id}`">{{m.title}}</router-link>
      </li>
    </ul>
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
    }
  }
</script>

<style>

</style>