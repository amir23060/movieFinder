import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  query: "",
  results: [],
  isOpen: false,
  loading: false
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },

    setResults: (state, action) => {
      state.results = action.payload
    },

    openSearch: (state) => {
      state.isOpen = true
    },

    closeSearch: (state) => {
      state.isOpen = false
      state.query = ""
      state.results = []
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const {
  setQuery,
  setResults,
  openSearch,
  closeSearch,
  setLoading
} = searchSlice.actions

export default searchSlice.reducer