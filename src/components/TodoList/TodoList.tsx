import * as React from 'react'
import {taskType} from "../../Redux/taskReducer";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {ToDoListType} from "./TodoListContainer";


export const TodoList: React.FC<ToDoListType> = ({tasksArray, onRemove, onToggle, changeTaskName, editOrder}) => {
    const [modeId, editMode] = useState<number>(-1221)

    const [title, setTitle] = useState<string>('')


    useEffect(() => {
        setTaskList(tasksArray)
    }, [tasksArray])

    const [taskList, setTaskList] = useState<taskType[]>(tasksArray)

    const [currentTask, setCurrentCard] = useState(tasksArray[0])


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const titleEdit = (id: number) => {
        editMode(id)
        tasksArray.find(task => {
            if (task.id === id) {
                setTitle(task.title)
            }
            return task
        })
    }

    const keyPressHandler = (event: React.KeyboardEvent, id: number) => {
        if (event.key === 'Enter') {
            changeTaskName(id, title)
            editMode(-1221)
        }

    }
    if (!tasksArray) {
        return <h2>Пока дел нет!</h2>
    }

    const sortTasks = (a: taskType, b: taskType) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return <ul className='listUl'>
        {taskList.sort(sortTasks).map(task => {
            const classes = ['todo']
            if (task.completed) {
                classes.push('completed')
            }

            function dragStarHandler(e: React.DragEvent<HTMLDivElement>, card: any) {
                setCurrentCard(card)
            }

            function dragEndHandler(e: any) {
                e.target.style.background = "#f3f3f3"
            }


            function dragOverHandler(e: any) {
                e.preventDefault()
                e.target.style.background = "lightgray"
            }

            function dropHandler(e: any, element: any) {
                e.preventDefault()
                setTaskList(taskList.map(t => {
                    if (t.id === element.id) {
                        editOrder(t.id, currentTask.order)
                        return {...t, order: currentTask.order}

                    }
                    if (t.id === currentTask.id) {
                        editOrder(t.id, element.order)
                        return {...t, order: element.order}
                    }
                    return t
                }))
                e.target.style.background = "#f3f3f3"
            }


            return (
                <li className={classes.join(' ')} key={task.id}>
                    <div
                        onDragStart={(e) => dragStarHandler(e, task)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, task)}
                        className='taskContainer'
                        draggable={true}
                    >
                        <input defaultChecked={task.completed}
                               type="checkbox"
                               onClick={() => onToggle(task.id)}
                        />
                        {modeId === task.id
                            ? <TextField
                                label="Откорректируйте дело"
                                id="standard-size-normal title"
                                variant="standard"
                                onChange={changeHandler}
                                value={title}
                                type="text"
                                onBlur={() => editMode(1221)}
                                onKeyPress={(event) => keyPressHandler(event, task.id)}
                            />
                            : <span>{task.title}</span>
                        }

                        <div>
                            <i
                                className="material-icons red-text"
                                onClick={(event) => titleEdit(task.id)}
                            >
                                edit
                            </i>
                            <i
                                className="material-icons red-text"
                                onClick={() => onRemove(task.id)}
                            >
                                delete
                            </i>
                        </div>
                    </div>
                </li>
            )
        })}
    </ul>
}