import { createAction } from 'redux-actions'

/**
 * 1.发送请求获取数据  load_todo
 * 2.当异步操作完成后需要触发新指令  load_todo_success
 */

// 1.获取 todos 列表相关指令
export const load_todo = createAction('load_todo')
export const load_todo_success = createAction('load_todo_success')

// 2.新增 todo 列表项的相关指令
export const add_todo = createAction('add_todo')
export const add_todo_success = createAction('add_todo_success')

// 3.删除
export const remove_todo = createAction('remove_todo')
export const remove_todo_success = createAction('remove_todo_success')

// 4.更新
export const modify_todo = createAction('modify_todo')
export const modify_todo_success = createAction('modify_todo_success')

// 5.筛选
export const modify_todo_filter = createAction('modify_todo_filter')
export const modify_todo_filter_success = createAction('modify_todo_filter_success')

// 6.清除已完成任务
export const clear_todo_completed = createAction('clear_todo_completed')
export const clear_todo_completed_success = createAction('clear_todo_completed_success')

// 7.修改任务名称
export const modify_todo_edit = createAction('modify_todo_edit')
export const modify_todo_edit_success = createAction('modify_todo_edit_success')

// 任务名称确认
export const modify_todo_name = createAction('modify_todo_name')
export const modify_todo_name_success = createAction('modify_todo_name_success')
