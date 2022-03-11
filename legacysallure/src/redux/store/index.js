import { createStore, combineReducers, applyMiddleware } from "redux";
import cardInfoReducer from '../reducers/card-info-reducer.js'
import rootSaga from "../saga/index.js";
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({
        cardInfoReducer
    }),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)
export default store;