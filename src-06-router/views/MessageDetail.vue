<template>
  <ul>
    <li>id: {{$route.params.id}}</li>
    <li>title: {{messageDetail.title}}</li>
    <li>content: {{messageDetail.content}}</li>
  </ul>
</template>

<script>
  const allMessageDetails = [
    {id: 1, title: 'message001', content: 'message content 001'},
    {id: 3, title: 'message003', content: 'message content 003'},
    {id: 5, title: 'message005', content: 'message content 005'},
  ]
  export default {
    data () {
      return {
        messageDetail: {}
      }
    },

    // 当请求路由不变只是参数有变化时, 不会干掉当前组件对象再创建一个新, 而复用它 ==> mounted()不会反复执行
    mounted () {
      this.showUI(this.$route)
    },

    watch: {
      $route (value) {
        this.showUI(value)
      }
    },

    methods: {
      showUI (route) {
        const id = route.params.id * 1
        const messageDetail = allMessageDetails.find(md => md.id===id)
        this.messageDetail = messageDetail
      }
    }

    /*computed: {
      messageDetail () {
        const id = this.$route.params.id * 1
        return allMessageDetails.find(md => md.id===id)
      }
    }*/
  }
</script>

<style>

</style>