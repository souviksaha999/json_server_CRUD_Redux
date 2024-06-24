import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const AddPost = createAsyncThunk(" Add / User ", async(data, {rejectWithValue} )=>{
    try {
        const response = await axios.post(`http://localhost:3003/users`, data)
        console.log("ADD_USER_RESPONSE....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
} )

const addUserSlice = createSlice({
    name : "adduser",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(AddPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AddPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(AddPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default addUserSlice.reducer
