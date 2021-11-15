import * as React from 'react'
import {AppBar, Box, Typography} from '@mui/material'

export const Header = () => {
    return <Box sx={{flexGrow: 1}} >
        <AppBar position="static" >
            <Typography variant="h4"
                        color="inherit"
                        component="div"
                        p={2}
            >
                ToDoList
            </Typography>
        </AppBar>
    </Box>

}
