import { init, h } from "snabbdom"

// 1.通过 h 函数创建 vonode
let vNode = h('div#box.container', '123')

// 获取挂载元素
const dom = document.querySelector('#app')

// 2.通过 init 函数 得到 patch 函数
const patch = init([])

// 3.通过 patch 将 vnode 渲染到 dom
let oldVNode = patch(dom,vNode)

// 4.创建新的 VNode 更新给 oldVNode
vNode = h('p#test.abc','ppp')
patch(oldVNode,vNode)