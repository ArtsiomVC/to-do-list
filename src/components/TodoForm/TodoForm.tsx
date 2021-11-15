import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {AppStateType} from "../../Redux/createStore";
import {connect} from "react-redux";
import { addTask } from "../../Redux/taskReducer";


interface TodoFormProps {
    addTask(title: string): void
}
const TodoForm: React.FC<TodoFormProps> = (props) => {

    const [title, setTitle] = useState<string>("")

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.addTask(title)
            // props.onAdd(ref.current!.value)
            // console.log(title)
            setTitle('')
        }
    }

    // const ref = useRef<HTMLInputElement>(null)

    return <Box sx={{}} pt={2}>
        <TextField
            fullWidth
            label="Введите название дела"
            id="standard-size-normal title"
            // defaultValue="Normal"
            variant="standard"
            placeholder="Введите название дела"
            onChange={changeHandler}
            value={title}
            // ref={ref}
            type="text"
            // id="title"
            onKeyPress={keyPressHandler}
        />

        {/*<input*/}
        {/*    // onChange={changeHandler}*/}
        {/*    // value={title}*/}
        {/*    ref={ref}*/}
        {/*    type="text"*/}
        {/*    id="title"*/}
        {/*    // onKeyPress={keyPressHandler}*/}
        {/*    placeholder="Введите название дела"*/}
        {/*/>*/}
        {/*<label className='active' htmlFor="title">*/}
        {/*    Введите название дела*/}
        {/*</label>*/}
    </Box>

}


let mapStateToProps = (state: AppStateType)=> ({

})

export default connect(mapStateToProps, {addTask})(TodoForm)