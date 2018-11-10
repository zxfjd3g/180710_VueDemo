<template>
  <div>
    <h2>第一个Vue组件化项目</h2>
    <img src="./assets/logo.png" alt="logo" class="logo">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  }
}
</script>

<style>
  .logo {
    width: 100px;
    height: 100px;
  }
</style>
