import { createSlice } from '@reduxjs/toolkit'



export const themeSlice = createSlice({
    name: 'theme',
    initialState: 'dark',
    reducers: {
        change: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state = state === 'light' ? 'dark' : 'light'
            return state
        }
    },
})

// Action creators are generated for each case reducer function
export const { change } = themeSlice.actions