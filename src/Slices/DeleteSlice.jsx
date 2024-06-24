import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const DeleteUser = createAsyncThunk("Delete / Users", async(id, {rejectWithValue} )=>{
    try {
        const response = await axios.delete(`http://localhost:3003/users/${id}`)
        console.log("DELETE_USERS_RESPONSE....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
} )

const deleteUserSlice = createSlice({
    name : "deleteusers",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(DeleteUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(DeleteUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(DeleteUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default deleteUserSlice.reducer
