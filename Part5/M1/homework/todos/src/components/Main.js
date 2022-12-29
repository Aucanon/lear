import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from '../store/actions/todo.actions'
import { getIn } from 'immutable'

class Main extends Component {
  // 调用具体指令函数 触发数据获取操作
  componentDidMount () {
    this.props.load_todo()
  }

  removeTask (id) {
    this.props.remove_todo(id)
  }

  modifyName (id, e) {
    this.props.modify_todo_edit({id: id, isEditing: false})
    this.props.modify_todo_name({id: id, taskName: e.target.value})
  }

  render() {
    // console.log(this.props);
    return (
      <section className="main">
				<input className="toggle-all" type="checkbox" />
				<ul className="todo-list">
					{
            this.props.todos.map(item => {
              let classes = []
              if (item.isCompleted) classes.push('completed')
              if (item.isEditing) classes.push('editing')
              return (
                <li key={item.id} className={classes.join(' ')}>
                  <div className="view">
                    <input defaultChecked={item.isCompleted} onChange={(e) => {this.props.modify_todo({id: item.id, isCompleted: e.target.checked})}} className="toggle" type="checkbox"/>
                    <label onDoubleClick={() => {this.props.modify_todo_edit({id: item.id, isEditing: true})}}>{ item.taskName }</label>
                    <button className="destroy" onClick={this.removeTask.bind(this,item.id)}></button>
                  </div>
                  <input onBlur={this.modifyName.bind(this, item.id)} defaultValue={item.taskName} className="edit"/>
                </li>
              )
            })
          }
				</ul>
			</section>
    )
  }
}

// 1.获取 store 中的数据
const mapStateToProps = (state) => ({
  todos: filterTodos(getIn(state.todoReducer, ['todos']), getIn(state.todoReducer, ['filter'])) 
})

// 2.处理 dispatch 函数
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(todoActions, dispatch)
})

// 3.依据 filter 筛选出需要展示的数据
function filterTodos(todos, filter) {
  switch(filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(todo => !todo.isCompleted)
    case 'completed':
      return todos.filter(todo => todo.isCompleted)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)