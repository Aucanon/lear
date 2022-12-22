class Compiler {
  constructor (vm) {
    this.vm = vm
    this.el = vm.$el

    // 初始化模板编译方法
    this.compile(this.el)
  }

  // 基础模板方法
  compile (el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 检测节点类型 文本节点、元素节点
      if (isTextNode(node)) {
        // 编译文本节点内容
        this.compilerText(node)
      } else if (isElementNode(node)) {
        // 编译元素节点内容
        this.compileElement(node)
      }
      // 检测元素是否存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 封装文本节点编译方法
  compilerText (node) {
    const reg = /\{\{(.+?)\}\}/g
    // 去除内容中不必要的空格和换行
    const value = node.textContent.replace(/\s/g, '')
    // 声明数据存储多段文本
    const tokens = []
    // 记录已经操作过后的索引值
    let lastIndex = 0
    // 记录当前提取内容的初始索引
    let index
    let result
    while (result = reg.exec(value)) {
      // 本次内容提取的初识索引
      index = result.index
      // 处理普通文本
      if (index > lastIndex) {
        // 将中间部分内容存储到 tokens 中
        tokens.push(value.slice(lastIndex, index))
      }
      // 出理插值表达式内容
      const key = result[1].trim()
      // 根据 key 获取对应属性值 存储到数组
      tokens.push(this.vm[key])

      // 更新 lastIndex
      lastIndex = index + result[0].length

      // 创建订阅者监测数据变化 Wathcer
      const position = tokens.length - 1
      new Watcher(this.vm, key, newValue => {
        // 数据变化 修改 tokens 中的对应数据
        tokens[position] = newValue
        // 重新渲染
        node.textContent = tokens.join('')
      })
    }
    // 页面初识渲染
    node.textContent = tokens.join('')
  }

  // 封装元素节点编译方法
  compileElement (node) {
    Array.from(node.attributes).forEach(attr => {
      // 保存属性名称 并检测属性功能
      let attrName = attr.name
      if (!isDirective(attrName)) return
      // 获取指令的具体名称
      attrName = attrName.slice(2)
      // 获取指令的值代表响应式数据的名称
      const key = attr.value
      // 封装 update 方法用于进行不同指令功能分配
      this.update(node, key, attrName)
    })
  }
    // 用于进行指令分配
  update (node, key, attrName) {
    // 名称处理
    let updateFn = this[attrName + 'Updater']
    // 检测并调用
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }
  // v-text 处理
  textUpdater (node, key, value) {
    node.textContent = value
    // 订阅数据变化
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }
  // v-model 处理
  modelUpdater (node, key, value) {
    // 给元素设置数据
    node.value = value
    // 订阅数据变化
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
}

// 判断节点是否为文本节点
function isTextNode (node) {
  return node.nodeType === 3
}

// 判断节点是否为元素节点
function isElementNode (node) {
  return node.nodeType === 1
}

// 判断属性名是否为指令
function isDirective (attrName) {
  return attrName.startsWith('v-')
}