<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader/>
      <TodoMain/>
      <TodoFooter/>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'

  export default {
    components: {
      TodoHeader: Header,
      TodoMain: Main,
      TodoFooter: Footer,
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>