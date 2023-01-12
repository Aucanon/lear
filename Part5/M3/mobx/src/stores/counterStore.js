import { observable, configure, action, runInAction, flow, computed, get, autorun } from "mobx"
import axios from "axios"

// 通过配置强制程序使用 action 函数更改应用程序中的状态
configure({ enforceActions: 'observed' })

// 1.创建store 对象村塾默认状态0
class CounterStore {

  constructor () {
    autorun (() => {
      try {
        uniqueUsername(this.username)
        console.log('用户名ok');
      } catch (e) {
        console.log(e.message);
      }
    }, {delay: 1500})
  }

  @observable count = 0
  @observable users = []
  @observable username = ''

  // @action increment = () => {
  //   this.count = this.count + 1
  //   console.log(this);
  // }

  // @action decrement = () => {
  //   this.count = this.count - 1
  // }

  @action.bound increment () {
    this.count = this.count + 1
    console.log(this);
  }

  @action.bound decrement () {
    this.count = this.count - 1
  }

  // 异步更新状态1
  // @action.bound async getData () {
  //   const { data } = await axios.get('https://api.github.com/users')
  //   runInAction(() => this.users = data)
  // }

  // 异步更新状态2
  getData = flow(function* () {
    const { data } = yield axios.get('https://api.github.com/users')
    this.users = data
  }).bind(this)

  @computed get getResult () {
    return this.count * 10
  }

  @action.bound changeUsername (username) {
    this.username = username
  }
}

const counter = new CounterStore()

function uniqueUsername (username) {
  return new Promise((resolve, reject) => {
    if (username === 'admin') {
      reject('用户名不可用')
    } else {
      resolve()
    }
  })
}

// 2.将 store 对象放在一个全局的组件可以拿到的地方
// --> index.js  Provider

// 3.让组件获取 store 对象中的状态并将状态显示在组件中

export default counter
