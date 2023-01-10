import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/root.reducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)