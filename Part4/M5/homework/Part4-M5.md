# 简答题



1. 描述 Vue 响应式原理。
  vue2 中响应式是通过Object.defineProperty进行数据劫持并结合发布订阅者模式实现
  vue3 中响应式不再使用Object.defineProperty 转向使用es6新语法的 proxy


2. 描述 Vue 响应式原理中的 Vue 类、Observer 类、Dep 类、Watcher 类、Compiler 类。
  Vue：1.存储属性 2.将 data 属性注入 vue 实例 3. 创建 Observer 类实现 data 的属性变化 4.调用 Compiler
  Observer：实现数据劫持并监控对象
  Dep：订阅者功能（添加、存储、通知）
  Watcher：监听数据变化更新视图
  Compiler：模板编译


3. 什么是 Virtural DOM。
  虚拟节点，通过 JS 的 Object 对象模拟 DOM 中的节点然后在通过特定的 rander 方法将其渲染为真实 DOM


4. Snabbdom 的使用流程
  1.init 获取 patch 函数
  2.h 函数创建 VNode
  3.获取挂在元素
  4.渲染 VNode


5. Snabbdom 的核心介绍
  核心：init、patch、tovnode、h
  核心部分的源代码只有两百多行（其实不止），容易读懂。
  通过 modules 可以很容易地扩展。
  钩子函数很丰富，用户可以通过钩子函数直接干涉 Vnode 到 DOM 挂载到最终销毁的全过程。
  性能很棒。
  容易集成。
  通过 h 函数，可以很容易地创建 Vnode。
  通过 h 函数可以创建 SVG 元素。
  事件处理能力强大。
  可以通过 Thunks 优化 DOM Diff 和事件。