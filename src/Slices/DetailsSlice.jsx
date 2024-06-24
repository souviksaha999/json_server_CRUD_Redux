import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const UserDetailsFetch = createAsyncThunk(" Details / User / Fetch", async(id, {rejectWithValue} )=>{
    try {
        const response = await axios.get(`http://localhost:3003/users/${id}`)
        console.log("USER_DETAILS_RESPONSE....", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
} )

const userDetailsSlice = createSlice({
    name : "userdetails",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(UserDetailsFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(UserDetailsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(UserDetailsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default userDetailsSlice.reducer
