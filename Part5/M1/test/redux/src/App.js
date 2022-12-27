import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as contentActions from './store/actions/Content.actions'

// 1.创建 store 保存数据关联 reducer
// 2.利用 provider 将 store 向后传递
// 3.在具体的组建中使用 connect 方法获取 store 中的数据 通过组件的 props 进行访问

class App extends Component {

  constructor () {
    super()
    this.myRef = React.createRef()
  }

  handler = () => {
    // 获取 input 输入框内容
    const content = this.myRef.current.value
    // 调用 dispatch 方法将输入框中的内容传给 action 在 reducer 当中进行处理
    // this.props.dispatch({type:'addContent', content})
    this.props.addContent(content)
    // 自动更新界面
    this.myRef.current.value = ''
  }

  render() {
    console.log(this.props);
    return (
       <div>
       <input type='text' placeholder='请输入标题' ref={this.myRef} />
       <button onClick={this.handler}>新增</button>
        <ul>
          {
            this.props.content.map((item, index) => <li key={index}>{item}</li>)
          }
        </ul>
       </div>
    )
  }
}

// 从 store 中获取当前组件需要的数据
const mapStateToProps = (state) => ({
  content: state.contentReducer.content
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(contentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
// connect 可以传两个参数 第一个是用来处理数据 第二个用来自动触发 dispatch 的
