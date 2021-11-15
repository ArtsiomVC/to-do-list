const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"
const TOGGLE_TASK = "TOGGLE_TASK"
const CHANGE_TASK_NAME = "CHANGE_TASK_NAME"
const TASK_LOAD = "TASK_LOAD"
const EDIT_ORDER = "EDIT_ORDER"

export type taskType = {
    completed: boolean
    id: number
    title: string
    order: number
}

let initialState = {
    tasksArray: [] as Array<taskType>
};
type InitialStateType = typeof initialState

export const taskReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_TASK:
            return {...state, tasksArray: [...state.tasksArray, action.newTask]}
        case REMOVE_TASK:
            return {...state, tasksArray: state.tasksArray.filter(task => task.id !== action.id)}
        case TOGGLE_TASK:
            const taskEdit = state.tasksArray.map(task => {
                if (task.id === action.id) {
                    task.completed = !task.completed
                }
                return task
            })
            return {...state, tasksArray: taskEdit}
        case CHANGE_TASK_NAME:
            const editName = state.tasksArray.map(task => {
                if (task.id === action.id) {
                    task.title = action.title
                }
                return task
            })
            return {...state, tasksArray: editName}
        case TASK_LOAD:
            return {...state, tasksArray: action.tasks}
        case EDIT_ORDER:
            const editOrderTask = state.tasksArray.map(task => {
                if (task.id === action.id) {
                    task.order = action.order
                }
                return task
            })
            return {...state, tasksArray: editOrderTask}
        default:
            return state;
    }
}

//////

type getWeatherSuccessActionType = {
    type: typeof ADD_TASK,
    newTask: taskType
}
export const addTaskSuccess = (newTask: taskType): getWeatherSuccessActionType => ({
    type: ADD_TASK, newTask
})

type onRemoveSuccessActionType = {
    type: typeof REMOVE_TASK,
    id: number
}
export const onRemoveSuccess = (id: number): onRemoveSuccessActionType => ({
    type: REMOVE_TASK, id
})

type onToggleSuccessActionType = {
    type: typeof TOGGLE_TASK,
    id: number
}
export const onToggleSuccess = (id: number): onToggleSuccessActionType => ({
    type: TOGGLE_TASK, id
})
type titleTaskEditActionType = {
    type: typeof CHANGE_TASK_NAME,
    id: number,
    title: string
}
export const changeTaskNameSuccess = (id: number, title: string): titleTaskEditActionType => ({
    type: CHANGE_TASK_NAME, id, title
})
type loadTasksSuccessActionType = {
    type: typeof TASK_LOAD,
    tasks: Array<taskType>
}
export const loadTasksSuccess = (tasks: Array<taskType>): loadTasksSuccessActionType => ({
    type: TASK_LOAD, tasks
})

type editOrderSuccessActionType = {
    type: typeof EDIT_ORDER,
    id: number
    order: number
}
export const editOrderSuccess = (id: number, order: number): editOrderSuccessActionType => ({
    type: EDIT_ORDER, id, order
})

////


export const addTask = (title: string) => async (dispatch: any) => {
    let newTask = await request('/api', "POST", {title})
    dispatch(addTaskSuccess(newTask))



}

export const onRemove = (id: number) => async (dispatch: any) => {
    await request('/api', "DELETE", {id})
    dispatch(onRemoveSuccess(id))
}

export const onToggle = (id: number) => async (dispatch: any) => {
    await request(`/api`, "PUT", {id})
    dispatch(onToggleSuccess(id))
}

export const changeTaskName = (id: number, title: string) => async (dispatch: any) => {
    await request(`/api/tasks`, "PUT", {id, title})
    dispatch(changeTaskNameSuccess(id, title))

}

export const loadTasks = () => async (dispatch: any) => {
    let tasks = await request('/api')
    dispatch(loadTasksSuccess(tasks))
}

export const editOrder = (id: number, order: number) => async (dispatch: any) => {
    await request(`/api/order`, "PUT", {id, order})
    dispatch(editOrderSuccess(id, order))
}

/////////

async function request(url: string, method = 'GET', data: any = null) {
    try {
        const headers: any = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e: any) {
        console.warn("Error", e.message)
    }
}



// const socket = new WebSocket('ws://localhost:3333/api/')
//
//
// socket.onmessage = (event) => {
//     console.log("С сервера пришло собщение:", event.data)
// }
//
//
// socket.onopen = () => {
//     console.log(`Клиент: Подключение установленно`)
//     socket.send(JSON.stringify({
//         message: "Привет",
//         method: "connection",
//         id: 333,
//         username: "Artsiom"
//     }))
// }
// socket.onclose = () =>  console.log(`Клиент: Подключение прерванно`)
//

