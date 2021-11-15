import React from 'react'
import './App.css'
import {Header} from "./components/Header/Header"
import {Provider} from "react-redux"
import store from "./Redux/createStore"
import TodoListContainer from './components/TodoList/TodoListContainer'
import TodoForm from "./components/TodoForm/TodoForm";




const App = () => {
    return <Provider store={store}>
        <div className="wrapper_app">
            <Header/>
            <div className='containerTodo'>
                <TodoForm/>
                <TodoListContainer/>
            </div>
        </div>
    </Provider>
}

export default App;
