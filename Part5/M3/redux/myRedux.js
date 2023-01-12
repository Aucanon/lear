/**
 *  createStore(reducer, preloadedState, enhancer)
 *  { getState, dispatch, subscrib }
 */

function createStore (reducer, preloadedState, enhancer) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer 必须是函数')

  // 判断 enhancer 参数是否传递
  if (typeof enhancer !== 'undefined') {
    // 判断 enhancer 是不是函数
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer 必须是函数')
    }
    return enhancer(createStore)(reducer, preloadedState)
  }

  // store对象中存储的状态
  var currentState = preloadedState

  // 存放订阅者函数
  var currentListeners = []

  // 获取状态
  function getState () {
    return currentState
  }

  // 用于触发 action
  function dispatch (action) {
    // 判断 action 是否为对象
    if (!isPlainObject(action)) throw new Error('action 必须是对象')
    // 判断对象中是否具有 type 属性
    if (typeof action.type === 'undefined') throw new Error('action 对象中必须要有type属性')
    currentState = reducer(currentState, action)
    // 循环数组调用订阅者
    for (var i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      var listener = currentListeners[i]
      // 调用订阅者
      listener()
    }
  }

  // 订阅状态
  function subscrib (listener) {
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscrib
  }
}

// 判断 obj 参数是否为对象
function isPlainObject (obj) {
  // 排除基本数据类型和空
  if (typeof obj !== 'object' || obj === null) return false
  // 区分数组和对象 原型对象对比的方式
  var proto = obj
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

function applyMiddleware (...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建 store
      var store = createStore(reducer, preloadedState)
      // 阉割版 store
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      }
      // 调用中间件的第一层函数 传递阉割版的store 对象
      var chain = middlewares.map(middleware => middleware(middlewareAPI))
      var dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose () {
  var funcs = [...arguments]
  return function (dispatch) {
    for (var i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

function bindActionCreators (actioncreators, dispatch) {
  var boundActionCreators = {}
  for (var key in actioncreators) {
    (function (key) {
      boundActionCreators[key] = function () {
      dispatch(actioncreators[key]())
    }
    })(key)
  }
  return boundActionCreators
}

function combineReducers (reducers) {
  // 检查 reducer 类型是不是函数
  var reducerKeys = Object.keys(reducers)
  for (var i = 0;i < reducerKeys.length;i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] !== 'function') throw new Error('reducer 必须是函数')
  }
  // 调用每一个reducer 并将reducer中返回的状态存储在一个新的大的对象中
  return function (state, action) {
    var nextState = {}
    for (var i = 0;i < reducerKeys.length;i++) {
      var key = reducerKeys[i]
      var reducer = reducers[key]
      var previousStateForKey = state[key]
      nextState[key] = reducer(previousStateForKey, action)
    }
    console.log(nextState);
    return nextState
  }
}
