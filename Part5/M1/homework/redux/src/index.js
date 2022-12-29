import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import totalReducer from './store/Reducers/index'

// 1.创建 store 存储数据
const store = createStore(totalReducer)
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
