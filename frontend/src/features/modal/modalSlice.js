import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getMovieDetails,
  getMovieVideos
} from "../../api/movieApi"
import {
  getSerieDetails,
  getSerieVideos
} from "../../api/seriesApi"

// FETCH ITEM (movie or series)
export const fetchItemModal = createAsyncThunk(
  "itemModal/fetchItemModal",
  async ({ itemId, media_type }) => {
    let itemData
    let videoData

    if (media_type === "movie") {
      itemData = await getMovieDetails(itemId)
      videoData = await getMovieVideos(itemId)
    } else {
      itemData = await getSerieDetails(itemId)
      videoData = await getSerieVideos(itemId)
    }

    const trailer = videoData.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    )

    return {
      item: itemData,
      trailerKey: trailer ? trailer.key : null
    }
  }
)


const itemModalSlice = createSlice({
  name: "itemModal",
  initialState: {
    isOpen: false,
    item: null,
    itemId: null,
    media_type: null,
    trailerKey: null,
    showTrailer: false,
    loading: false,
    error: null
  },

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.itemId = action.payload.itemId
      state.media_type = action.payload.media_type
      state.showTrailer = false
    },

    closeModal: (state) => {
      state.isOpen = false
      state.item = null
      state.itemId = null
      state.media_type = null
      state.trailerKey = null
      state.showTrailer = false
    },

    openTrailer: (state) => {
      state.showTrailer = true
    },

    closeTrailer: (state) => {
      state.showTrailer = false
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItemModal.pending, (state) => {
        state.loading = true
      })

      .addCase(fetchItemModal.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload.item
        state.trailerKey = action.payload.trailerKey
      })

      .addCase(fetchItemModal.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const {
  openModal,
  closeModal,
  openTrailer,
  closeTrailer
} = itemModalSlice.actions

export default itemModalSlice.reducer