import { handleActions as createReducer } from 'redux-actions'
import { load_todo_success, add_todo_success, remove_todo_success, modify_todo_success, modify_todo_filter, clear_todo_completed_success, modify_todo_edit_success, modify_todo_name_success } from '../actions/todo.actions'
import { fromJS, setIn, mergeDeep, removeIn, getIn, updateIn } from 'immutable'

/**
 * 接收到指令后对数据进行相应的处理
 * 
 */

const initialState = fromJS({
  todos: [],
  filter: 'all'
})

const load_todo_action = (state, action) => {
  // setIn 第一个参数为当前要操作的数据  第二个参数为要操作的数据的那个属性  第三个参数为要设置的值
  return setIn(state, ['todos'], action.payload)
}
const add_todo_action = (state, action) => {
  // { ...state, todos: [...state.todos, action.payload]}
  // mergeDeep 第二个参数为要合并的属性及被合并的值
  return mergeDeep(state, {todos: [action.payload]})
}
const remove_todo_action = (state, action) => {
  // let id = action.payload
  // let index = state.todos.findIndex(todo => todo.id === id)
  let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload)
  // let todos = JSON.parse(JSON.stringify(state.todos))
  // todos.splice(index, 1)
  // return { ...state, todos }
  // removeIn 第二个参数为要删除的属性和位置
  return removeIn(state, ['todos', index])
}
const modify_todo_action = (state, action) => {
  // let params = action.payload
  // let index = state.todos.findIndex(todo => todo.id === params.id)
  let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
  // let todos = JSON.parse(JSON.stringify(state.todos))
  // todos[index].isCompleted = params.isCompleted
  // return {
  //   ...state,
  //   todos
  // }
  // 第二个参数为要更新的属性 第三个参数为更新值
  return updateIn(state, ['todos', index], () => action.payload)
}
const filter_todo_action = (state, action) => {
  // return {
  //   ...state,
  //   filter: action.payload
  // }
  return setIn(state, ['filter'], action.payload)
}
const clear_todo_action = (state, action) => {
  // let todos = JSON.parse(JSON.stringify(state.todos))
  let todos = getIn(state, ['todos']).filter(todo => !todo.isCompleted)
  // todos = todos.filter(todo => !todo.isCompleted)
  // return {
  //   ...state,
  //   todos
  // }
  return setIn(state, ['todos'], todos)
}
const edit_todo_action = (state, action) => {
  // console.log(action);
  // let todos = JSON.parse(JSON.stringify(state.todos))
  // let index = state.todos.findIndex(todo => todo.id === action.payload.id)
  let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
  // todos[index].isEditing = action.payload.isEditing
  // return {
  //   ...state,
  //   todos
  // }
  return updateIn(state, ['todos', index], () => action.payload)
}
const name_todo_action = (state, action) => {
  // let todos = JSON.parse(JSON.stringify(state.todos))
  // let index = state.todos.findIndex(todo => todo.id === action.payload.id)
  let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
  // todos[index].taskName = action.payload.taskName
  // return {
  //   ...state,
  //   todos
  // }
  return updateIn(state, ['todos', index], () => action.payload)
}

export default createReducer({
  [load_todo_success]: load_todo_action,
  [add_todo_success]: add_todo_action,
  [remove_todo_success]: remove_todo_action,
  [modify_todo_success]: modify_todo_action,
  [modify_todo_filter]: filter_todo_action,
  [clear_todo_completed_success]: clear_todo_action,
  [modify_todo_edit_success]: edit_todo_action,
  [modify_todo_name_success]: name_todo_action
}, initialState)
// 第一个参数为 当前的指令  第二个参数为初始值