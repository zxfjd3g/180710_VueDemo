<template>
  <div>
    <h2 v-show="firstView">请输入关键字进行搜索</h2>
    <h2 v-show="loading">请求中....</h2>
    <h2 v-show="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-show="users.length">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

  export default {
    data () {
      return {
        firstView: true, // 是否显示初始页
        loading: false, // 是否正在请求中
        users: [], // 用户列表数组数据
        errorMsg: '', // 错误提示信息
      }
    },

    mounted () {
      // 订阅消息(search)
      PubSub.subscribe('search', async (msg, searchName) => {
        // 更新状态数据(请求中)
        this.firstView = false
        this.loading = true
        this.users = []
        this.errorMsg = ''

        // 使用axios发ajax请求
        const url = `https://api.github.com/search/users?q=${searchName}`
        try {
          const response = await axios.get(url)
          const result = response.data
          const users = result.items.map(item => ({
            name: item.login,
            url: item.html_url,
            avatar_url: item.avatar_url
          }))

          // 更新状态数据(成功)
          this.loading = false
          this.users = users
        } catch (error) {
          // 更新状态(失败)
          this.loading = false
          this.errorMsg = '请求失败'
        }

      })
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>