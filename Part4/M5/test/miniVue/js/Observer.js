// 数据劫持 监控对象

class Observer {
  // 接收传入的对象 将对象的属性转化为getter/setter
  constructor (data) {
    this.data = data
    // 遍历数据
    this.walk(data)
  }
  // 封装用于数据遍历的方法
  walk(data) {
    // 将遍历后的属性转换为 Getters/Setter
    Object.keys(data).forEach(key => this.convert(key, data[key]))
  }
  // 封装将对象转换为响应式数据的方法
  convert (key, value) {
    defineReactive(this.data, key, value)
  }
}

// 用于为对象定义一个响应式属性
function defineReactive (data, key, value) {

  // 创建消息中心
  const dep = new Dep()

  observer(value)

  // 进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      console.log('获取属性')

      //  * 在触发 Getter 时添加订阅者
      Dep.target && dep.addSub(Dep.target)

      return value
    },
    set (newValue) {
      console.log('设置属性')
      if (newValue === value) return
      value = newValue
      observer(value)

      // * 当数据变化时 通知消息中心
      dep.notify()
    }
  })
}

function observer (value) {
  // 检测是否为对象 如果是创建一个新的 Observer 实例进行管理
  if (typeof value === 'object' && value !== null) {
    return new Observer(value)
  }
}