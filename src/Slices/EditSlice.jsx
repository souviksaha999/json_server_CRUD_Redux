import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const EditPut = createAsyncThunk(" Edit / User ", async({id,data}, {rejectWithValue} )=>{
    try {
        const response = await axios.put(`http://localhost:3003/users/${id}`, data)
        console.log("EDIT_USER_RESPONSE....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
} )

const editUserSlice = createSlice({
    name : "edituser",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(EditPut.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(EditPut.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(EditPut.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default editUserSlice.reducer
