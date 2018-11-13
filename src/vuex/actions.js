/*
包含n个用于间接更新状态数据的方法的对象
 */
import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_COMPLETE_TODOS,
  SELECT_ALL_TODOS
} from './mutation-types'

export default {

  addTodo ({commit}, todo) {
    // action中向mutation提交的不是数据本身, 而是包含数据的对象
    commit(ADD_TODO, {todo})
  },

  deleteTodo ({commit}, index) {
    commit(DELETE_TODO, {index})
  },

  deleteCompleteTodos ({commit}) {
    commit(DELETE_COMPLETE_TODOS)
  },

  selectAllTodos ({commit}, isCheck) {
    commit(SELECT_ALL_TODOS, {isCheck})
  }
}