import {applyMiddleware, createStore } from "redux";
import thunkMiddleWare from 'redux-thunk';
import {taskReducer, } from "./taskReducer";


type RootReducerType = typeof taskReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(taskReducer, applyMiddleware(thunkMiddleWare));


export default store;