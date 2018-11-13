<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
          <span>已完成{{completeSize}}</span> / 全部{{totalSize}}
        </span>
    <button class="btn btn-danger" v-show="completeSize" @click="$store.dispatch('deleteCompleteTodos')">清除已完成任务</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {

      ...mapGetters(['completeSize', 'totalSize']),

      // 是否选择/同步修改所有todo
      isCheckAll: {
        get () {
          return this.$store.getters.isAllSelect
        },

        set (value) { // value代表当前是否勾选的boolean值
          this.$store.dispatch('selectAllTodos', value)
        }
      }
    }
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>