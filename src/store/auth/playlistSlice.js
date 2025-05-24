import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchTracksByUser,
  createTrack,
  deleteTrackByUser,
  updateTrackByUser
} from '../../services/playlist'

const initialState = {
  tracks: [],
  status: 'idle',
  error: null
}

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async () => {
    const response = await fetchTracksByUser()
    return response
  }
)

export const addTrack = createAsyncThunk(
  'playlist/addTrack',
  async trackData => {
    const response = await createTrack(trackData)
    return response
  }
)

export const removeTrack = createAsyncThunk(
  'playlist/removeTrack',
  async ({ id, addedBy }) => {
    await deleteTrackByUser({ id })
    return id
  }
)

export const updateTrack = createAsyncThunk(
  'playlist/updateTrack',
  async ({ id, addedBy, name }) => {
    console.log('name :>> ', name)
    const response = await updateTrackByUser({ id, addedBy, name })
    return response
  }
)

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.tracks = action.payload
        state.status = 'succeeded'
      })
      .addCase(addTrack.fulfilled, (state, action) => {
        if (action.payload) {
          state.tracks.push(action.payload)
        }
      })
      .addCase(removeTrack.fulfilled, (state, action) => {
        state.tracks = state.tracks.filter(
          track => track._id !== action.payload
        )
      })
      .addCase(updateTrack.fulfilled, (state, action) => {
        const index = state.tracks.findIndex(t => t._id === action.payload._id)
        if (index !== -1) state.tracks[index] = action.payload
      })
  }
})

export default playlistSlice.reducer
