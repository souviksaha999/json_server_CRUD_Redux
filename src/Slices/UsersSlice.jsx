import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const UsersFetch = createAsyncThunk("Users / Fetch", async(arg, {rejectWithValue} )=>{
    try {
        const response = await axios.get(`http://localhost:3003/users`)
        console.log("ALL_USERS_RESPONSE....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
} )

const usersSlice = createSlice({
    name : "users",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(UsersFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(UsersFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(UsersFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default usersSlice.reducer
