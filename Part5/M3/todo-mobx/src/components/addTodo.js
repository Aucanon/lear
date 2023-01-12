import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

@inject('todo')
@observer
class AddTodo extends Component {

  // 添加任务
  addTodo (event) {

    const { todoAdd } = this.props.todo

    if (event.key === 'Enter') {
      // 获取用户在文本框输入内容
      const taskName = event.target.value
      // 判断用户是否输入了内容
      if (taskName.trim().length === 0) {
        return
      }
      // 将任务添加到列表
      todoAdd(taskName)
      event.target.value = ''
    }
    
  }

  render() {
    return (
      <header className="header">
				<h1>todos</h1>
				<input onKeyUp={this.addTodo.bind(this)} className="new-todo" placeholder="What needs to be done?" />
			</header>
    );
  }
}
 
export default AddTodo;