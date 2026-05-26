import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"

import { authApi }
from "../../api/authApi"

const storedUser =
localStorage.getItem("user")
  ? JSON.parse(
      localStorage.getItem("user")
    )
  : null

// LOGIN
export const loginUser =
createAsyncThunk(
  "auth/loginUser",

  async (
    { email, password },
    thunkAPI
  ) => {
    try {

      const data =
        await authApi.login(
          email,
          password
        )

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      return data.user

    } catch (error) {

      return thunkAPI
      .rejectWithValue(
        error.message
      )
    }
  }
)

// REGISTER
export const registerUser =
createAsyncThunk(
  "auth/registerUser",

  async (
    {
      name,
      email,
      password
    },
    thunkAPI
  ) => {
    try {

      const data =
        await authApi.register(
          name,
          email,
          password
        )

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      return data.user

    } catch (error) {

      return thunkAPI
      .rejectWithValue(
        error.message
      )
    }
  }
)

const authSlice =
createSlice({
  name:"auth",

  initialState:{
    user:storedUser,
    loading:false,
    error:null
  },

  reducers:{
    logOut:(state)=>{
      state.user=null
      localStorage.removeItem(
        "user"
      )
    }
  },

  extraReducers:(builder)=>{
    builder

      // LOGIN
      .addCase(
        loginUser.pending,
        (state)=>{
          state.loading=true
          state.error=null
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state,action)=>{
          state.loading=false
          state.user=
            action.payload
        }
      )

      .addCase(
        loginUser.rejected,
        (state,action)=>{
          state.loading=false
          state.error=
            action.payload
        }
      )

      // REGISTER
      .addCase(
        registerUser.pending,
        (state)=>{
          state.loading=true
          state.error=null
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state,action)=>{
          state.loading=false
          state.user=
            action.payload
        }
      )

      .addCase(
        registerUser.rejected,
        (state,action)=>{
          state.loading=false
          state.error=
            action.payload
        }
      )
  }
})

export const {
  logOut
} = authSlice.actions

export default
authSlice.reducer