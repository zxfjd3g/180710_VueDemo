/*
包含n个用于直接更新状态数据的方法的对象
 */
import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_FAIL
} from './mutation-types'

export default {

  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
    state.users = []
    state.errorMsg = ''
  },

  [REQ_SUCCESS] (state, {users}) {
    state.loading = false
    state.users = users
  },

  [REQ_FAIL] (state, {errorMsg}) {
    state.loading = false
    state.errorMsg = errorMsg
  },
}