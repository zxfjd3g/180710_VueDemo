<template>
  <div>
    <mt-button style="width: 100%" type="primary" @click="hint">测试mint-ui</mt-button>
  </div>
</template>

<script>

  // import {Button} from 'mint-ui'
  import { Toast } from 'mint-ui'

  export default {
    // 局部注册组件, 只能在当前组件使用
    /*components: {
      Button
    }*/
    methods: {
      hint () {
        Toast({
          message: '提示',
          position: 'bottom',
          duration: 5000
        });
      }
    }
  }
</script>

<style>

</style>