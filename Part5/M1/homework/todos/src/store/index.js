import { createStore, applyMiddleware } from 'redux'
import rooteReducer from './reducers/root.reducer'
import createSagaMiddleware from 'redux-saga'
import todoSaga from './saga/todo.saga'

/**
 * 当前模块完成 store 的创建 、 中间件的注册
 */

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rooteReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(todoSaga)

export default store