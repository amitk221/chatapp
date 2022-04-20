import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value:'',
}

export const loginSlice = createSlice({
    name:'token',
    initialState,
    reducers: {
        updateToken : (state, action)=>{
            state.value = action.payload
        },
        deleteToken : (state)=>{
            state.value = ''
        },
    },
})

export const {updateToken , deleteToken } = loginSlice.actions;

export default loginSlice.reducer;