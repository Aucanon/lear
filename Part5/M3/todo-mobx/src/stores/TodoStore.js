import { action, computed, observable } from "mobx"

class TodoStore {
  @observable todos = []
  @observable filter = 'All'

  // 添加任务
  @action.bound todoAdd (taskName) {
    this.todos.push({
      taskName,
      isCompleted: false
    })
  }

  // 删除任务
  @action.bound todoDelete (index) {
    this.todos.splice(index, 1)
  }

  // 更改任务完成状态
  @action.bound changeCompleted (index, flag) {
    this.todos[index].isCompleted = flag
  }

  @computed get unfinishedTodoCount () {
    return this.todos.filter(todo => todo.isCompleted === false).length
  }

  @action.bound changeFilter (condition) {
    this.filter = condition
  }

  // 检测筛选条件变化改变任务列表显示内容
  @computed get filterTodo () {
    switch (this.filter) {
      case 'All':
        return this.todos
      case 'Active':
        return this.todos.filter(todo => todo.isCompleted === false)
      case 'Completed':
        return this.todos.filter(todo => todo.isCompleted === true)
    }
  }

}

const todo = new TodoStore()

export default todo