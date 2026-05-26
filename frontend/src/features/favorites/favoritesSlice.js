import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"

import {
  addToFavorites,
  allFavorites,
  removeFromfavorites
}
from "../../api/authApi"


// LOAD FAVORITES
export const allUserFavorites =
createAsyncThunk(
  "favorites/allFavorites",

  async (_, thunkAPI)=>{

    try{

      const state =
        thunkAPI.getState()

      const userId =
        state.auth.user?._id

      const data =
        await allFavorites({
          userId
        })

      return data

    } catch(error){

      return thunkAPI
      .rejectWithValue(
        error.message
      )
    }
  }
)


// ADD FAVORITE
export const addUserFavorite =
createAsyncThunk(
  "favorites/addFavorite",

  async(
    {
      id,
      title,
      media_type,
      poster
    },
    thunkAPI
  )=>{

    try{

      const state =
        thunkAPI.getState()

      const userId =
        state.auth.user?._id

      await addToFavorites({
        userId,
        id,
        title,
        media_type,
        poster
      })

      return {
        id,
        title,
        media_type,
        poster
      }

    } catch(error){

      return thunkAPI
      .rejectWithValue(
        error.message
      )
    }
  }
)


// REMOVE
export const removeUserFavorite =
createAsyncThunk(
  "favorites/removeFavorite",

  async(
    { id },
    thunkAPI
  )=>{

    try{

      const state =
        thunkAPI.getState()

      const userId =
        state.auth.user?._id

      await removeFromfavorites({
        userId,
        id
      })

      return id

    } catch(error){

      return thunkAPI
      .rejectWithValue(
        error.message
      )
    }
  }
)

const favoriteSlice =
createSlice({

  name:"favorites",

  initialState:{
    items:[],
    loading:false,
    error:null
  },

  reducers:{},

  extraReducers:(builder)=>{

    builder

    // LOAD
    .addCase(
      allUserFavorites.pending,
      (state)=>{
        state.loading=true
      }
    )

    .addCase(
      allUserFavorites.fulfilled,
      (state,action)=>{
        state.loading=false
        state.items=
          action.payload
      }
    )

    .addCase(
      allUserFavorites.rejected,
      (state,action)=>{
        state.loading=false
        state.error=
          action.payload
      }
    )

    // ADD
    .addCase(
      addUserFavorite.fulfilled,
      (state,action)=>{
        state.items.push(
          action.payload
        )
      }
    )

    // REMOVE
    .addCase(
      removeUserFavorite.fulfilled,
      (state,action)=>{
        state.items =
          state.items.filter(
            fav =>
              fav.id !==
              action.payload
          )
      }
    )
  }
})

export default
favoriteSlice.reducer