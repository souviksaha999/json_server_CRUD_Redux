import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from '../UsersSlice'
import userDetailsSlice from '../DetailsSlice'
import deleteUserSlice from '../DeleteSlice'
import addUserSlice from '../AddSlice'
import editUserSlice from '../EditSlice'

export const store = configureStore({
  reducer: {
    allusers : UsersSlice,
    details : userDetailsSlice,
    delete : deleteUserSlice,
    add : addUserSlice,
    edit : editUserSlice,
  },
})
