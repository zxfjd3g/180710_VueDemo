<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>
  export default {
    // 指定接收属性的属性名, 属性值的类型
    props: {
      todo: Object,
      deleteTodo: Function,
      index: Number
    },

    data () {
      return {
        bgColor: 'white',
        isShow: false
      }
    },

    methods: {
      handleEnter (isEnter) {
        /*if(isEnter) { // 进入
          this.bgColor = '#cccccc'
          this.isShow = true
        } else { // 离开
          this.bgColor = '#ffffff'
          this.isShow = false
        }*/
        this.bgColor = isEnter ? '#cccccc' : '#ffffff'
        this.isShow = isEnter
      },

      deleteItem () {
        const {todo, deleteTodo, index} = this
        if(confirm(`确定删除${todo.title}吗?`)) {
          deleteTodo(index)
        }
      }
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>