/*
包含n个状态数据的对象, 相当于data
 */
import storageUtils from '../utils/storageUtils'

export default {
  todos: storageUtils.readTodos()
}