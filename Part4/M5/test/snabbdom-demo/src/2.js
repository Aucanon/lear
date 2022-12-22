// 包含子节点
import { init, h } from "snabbdom"

// 通过 init 函数 得到 patch 函数
const patch = init([])

// 创建办函子节点的 VNode
let VNode = h('div#container',[
  // 子节点列表 内部传入 VNode
  h('h1','标题1'),
  h('p','内容1')
])

// 获取挂载元素
const dom = document.querySelector('#app')

// 渲染VNode
const oldVNode = patch(dom,VNode)

// 清空内容为一个注释节点
patch(oldVNode,h('!'))