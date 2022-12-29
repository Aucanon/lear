import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'
import { add_todo, add_todo_success, load_todo, load_todo_success, remove_todo, remove_todo_success, modify_todo, modify_todo_success, clear_todo_completed, clear_todo_completed_success, modify_todo_edit, modify_todo_edit_success, modify_todo_name, modify_todo_name_success } from '../actions/todo.actions'

/**
 * 1.完成异步操作
 * 2.重新发送新的指令
 */

// 实现 load_todo_data 获取数据同时传递新指令
function* load_todo_data() {
  let todoData = yield axios.get('/todos')
  // console.log(todoData);
  yield put(load_todo_success(todoData))
}

// 实现 add_todo_data 
function* add_todo_data(action) {
  let taskInfo = yield axios.post('/todos', { taskName: action.payload })
  yield put(add_todo_success(taskInfo.task))
}

// remove_todo_data
function* remove_todo_data(action) {
  let removeTask = yield axios.delete('/todos', {
    params: {
      id: action.payload
    }
  })
  yield put(remove_todo_success(removeTask.tasks.id))
}

// modify_todo
function* modify_todo_data(action) {
  let params = action.payload
  let {task} = yield axios.put('/todos/isCompleted', params)
  yield put(modify_todo_success(task))
}

// clear_todo_completed
function* clear_todo_completed_data() {
  yield axios.delete('/todos/clearCompleted')
  yield put(clear_todo_completed_success())
}

// modify_todo_edit
function* modify_todo_edit_data(action) {
  let {task} = yield axios.put('/todos/isEditing', action.payload)
  yield put(modify_todo_edit_success(task))
}

// modify_todo_name
function* modify_todo_name_data(action) {
  let {task} = yield axios.put('/todos', action.payload)
  yield put(modify_todo_name_success(task))
}

export default function* todoSaga () {
  yield takeEvery(load_todo, load_todo_data)
  yield takeEvery(add_todo, add_todo_data)
  yield takeEvery(remove_todo, remove_todo_data)
  yield takeEvery(modify_todo, modify_todo_data)
  yield takeEvery(clear_todo_completed, clear_todo_completed_data)
  yield takeEvery(modify_todo_edit, modify_todo_edit_data)
  yield takeEvery(modify_todo_name, modify_todo_name_data)
}