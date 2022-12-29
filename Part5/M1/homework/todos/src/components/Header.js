import React, { Component } from 'react'
import * as todoActions from '../store/actions/todo.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getIn } from 'immutable'

class Header extends Component {

  addTodo = (e) => {
    if (e.keyCode === 13) {
      let taskName = e.target.value
      if (taskName.trim().length === 0) {
        alert('请输入内容！')
        return
      }
      // 触发新指令
      this.props.add_todo(taskName)
      e.target.value = ''
    }
  }

  render() {
    // console.log(123,this.props);
    return (
      <header className="header">
				<h1>todos</h1>
				<input onKeyUp={this.addTodo} className="new-todo" placeholder="还有什么任务没有完成?" autoFocus />
			</header>
    )
  }
}

// 组件与 store 
const mapStateToProps = (state) => ({
  todos: getIn(state.todoReducer, ['todos'])
})

// 组件与 dispatch
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(todoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)