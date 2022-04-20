import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value:'user',
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        updateUser : (state, action)=>{
            state.value = action.payload
        },
        deleteUser : (state)=>{
            state.value = ''
        },
    },
})

export const {updateUser , deleteUser } = userSlice.actions;

export default userSlice.reducer;