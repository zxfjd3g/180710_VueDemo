<template>
  <div>
    <h2 v-if="!repoName">LOADING...</h2>
    <p v-else>
      most star repo is
      <a :href="repoUrl">{{repoName}}</a>
    </p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    async mounted () {
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      // 使用vue-resource发异步ajax请求获取数据
      /*this.$http.get(url)
        .then(response => {
          const result = response.data
          const mostRepo = result.items[0]
          // 更新状态数据
          this.repoName = mostRepo.name
          this.repoUrl = mostRepo.html_url
        })
        .catch(response => {
          alert('请求出错了....')
        })*/

      // 使用axios发异步ajax请求获取数据
      /*axios.get(url)
        .then(response => {
          const result = response.data
          const mostRepo = result.items[0]
          // 更新状态数据
          this.repoName = mostRepo.name
          this.repoUrl = mostRepo.html_url
        })
        .catch(response => {
          alert('请求出错了222....')
        })*/
      /*
      1. 作用?
          简化promise的使用, 不再使用then().catch()来指定回调函数
          通过同步编程方式实现异步流程
      2. 哪里使用await?
         在返回promise对象的表达式左侧, 为了得到其异步返回结果数据(而不是promise)
      3. 哪里使用async?
        await所在函数定义的左侧
       */
      try {
        const response =  await axios.get(url)
        const result = response.data
        const mostRepo = result.items[0]
        // 更新状态数据
        this.repoName = mostRepo.name
        this.repoUrl = mostRepo.html_url
      } catch (e) {
        alert('请求出错了3333....')
      }

    }
  }
</script>

<style>

</style>