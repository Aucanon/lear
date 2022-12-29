import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from '../store/actions/todo.actions'
import { getIn } from 'immutable'

class Footer extends Component {
	
	clearTodo = () => {
		if (window.confirm('确认删除？')) {
			this.props.clear_todo_completed()
		}
	}

  render() {
		// console.log(this.props);
		let taskLen = this.props.todos.filter(todo => !todo.isCompleted).length
    return (
      <footer className="footer">
				<span className="todo-count">
					<strong>{taskLen}</strong> item left
				</span>
				<ul className="filters">
					<li>
						<span onClick={() => { this.props.modify_todo_filter('all') }}>All</span>
					</li>
					<li>
						<span onClick={() => { this.props.modify_todo_filter('active') }}>Active</span>
					</li>
					<li>
						<span onClick={() => { this.props.modify_todo_filter('completed') }}>Completed</span>
					</li>
				</ul>
				<button className="clear-completed" onClick={this.clearTodo}>Clear completed</button>
			</footer>
    )
  }
}

// 1.获取 store 中的数据
const mapStateToProps = (state) => ({
  todos: getIn(state.todoReducer, ['todos'])
})

// 2.处理 dispatch 函数
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(todoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)