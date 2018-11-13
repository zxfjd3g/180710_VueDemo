/*
vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
相当于data的对象
 */
const state = {
  count: 2  // 初始化状态数据
}

/*
包含n个用于直接更新状态数据方法的对象
 */
const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },

}

/*
包含n个用于间接更新状态数据方法的对象
调用commit()来触发mutation调用
 */
const actions = {
  increment ({commit}) {
    // 提交mutation, 触发对应的mutation调用
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  },
  incrementIfOdd ({commit, state}) {
    // 执行逻辑判断后才提交
    if(state.count%2===1) {
      commit('INCREMENT')
    }

  },
  incrementAsync ({commit}) {
    // 异步提交
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },
}

/*
包含n个基于state数据的getter计算属性方法的对象
 */
const getters = {
  evenOrOdd (state) {
    return state.count%2===1 ? '奇数' : '偶数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

