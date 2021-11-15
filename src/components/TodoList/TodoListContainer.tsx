import React, {useEffect} from 'react'
import {AppStateType} from "../../Redux/createStore"
import {connect} from "react-redux"
import {TodoList} from './TodoList'
import {changeTaskName, editOrder, loadTasks, onRemove, onToggle, taskType} from '../../Redux/taskReducer'


type mapStateToPropsType = {
    tasksArray: Array<taskType>
}
type mapDispatchToPropsType = {
    onRemove: (id: number) => void
    onToggle: (id: number) => void
    loadTasks: () => void
    changeTaskName: (id: number, title: string) => void
    editOrder: (id: number, order: number) => void
}
export type ToDoListType = mapStateToPropsType & mapDispatchToPropsType
const TodoListContainer: React.FC<ToDoListType> = ({
                                                                                       tasksArray,
                                                                                       onRemove,
                                                                                       onToggle,
                                                                                       changeTaskName,
                                                                                       loadTasks,
                                                                                       editOrder
                                                                                   }) => {
    useEffect(() => {
        loadTasks()
    }, [loadTasks])

    if(!tasksArray){
        return <span>Loading...</span>
    }
    return <TodoList
        tasksArray={tasksArray}
        onRemove={onRemove}
        onToggle={onToggle}
        changeTaskName={changeTaskName}
        editOrder={editOrder}
        loadTasks={loadTasks}
    />
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    tasksArray: state.tasksArray
})

export default connect(mapStateToProps, {
    onRemove, onToggle, changeTaskName, loadTasks, editOrder
})(TodoListContainer)