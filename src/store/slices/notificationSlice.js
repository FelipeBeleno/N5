import { createSlice } from '@reduxjs/toolkit'



export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        status: false,
        typeAlert: ''
    },
    reducers: {
        activate: (state, action) => {


            state = action.payload

            return state
        },
        disable: (state) => {
            state = {
                message: '',
                status: false,
                typeAlert: ''

            }
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const { activate, disable } = notificationSlice.actions


