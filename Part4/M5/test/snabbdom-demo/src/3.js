// 引入模块
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom"

// 2.注册模块（为 patch 函数添加模块对应的能力）
const patch = init([
  styleModule,eventListenersModule
])

// 3.使用模块
let VNode = h('div#box', {
  style: {
    backgroundColor: 'red',
    height: '200px',
    width: '200px'
  }
},[
  h('h1#title', {
    style: {
      color: 'yellow'
    },
    on: {
      click () {
        console.log(123);
      }
    }
  }, 'h1h1'),
  h('p','内容')
])

const dom = document.querySelector('#app')
patch(dom,VNode)