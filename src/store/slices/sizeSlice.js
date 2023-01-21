import { createSlice } from '@reduxjs/toolkit'



export const sizeSlice = createSlice({
    name: 'sizeS',
    initialState: {
        height: window.innerHeight,
        width: window.innerWidth
    },
    reducers: {
        changeSize: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log(action)
            state = action.payload
            return state
        }
    },
})

// Action creators are generated for each case reducer function
export const { changeSize } = sizeSlice.actions
