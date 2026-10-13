import { configureStore } from "@reduxjs/toolkit";
import itemModalSliceReducer from "../features/modal/modalSlice"
import searchReducer from "../features/search/searchSlice"
import authReducer

from "../features/auth/authSlice"
import favoriteReducer

from "../features/favorites/favoritesSlice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        favorites:favoriteReducer,
        itemModal:itemModalSliceReducer,
        search: searchReducer
    }
})