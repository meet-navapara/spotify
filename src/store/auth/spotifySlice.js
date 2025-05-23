import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const CLIENT_ID="010798707d41476ca285990245d63ccb"
const CLIENT_SECRET="26c6fbb034274097902abaae625fac21"

const getAccessToken = async () => {
  console.log("process.env.CLIENT_ID",process.env)
  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`
      }
    }
  )
  return response.data.access_token
}

export const fetchPlaylists = createAsyncThunk(
  'spotify/fetchPlaylists',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getAccessToken()
      const response = await axios.get(
        'https://api.spotify.com/v1/search?q=playlist&type=playlist&limit=10',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data.playlists.items.filter(p => p !== null)
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to fetch playlists'
      )
    }
  }
)

export const fetchTracks = createAsyncThunk(
  'spotify/fetchTracks',
  async (playlistId, { rejectWithValue }) => {
    try {
      const token = await getAccessToken()
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data.items
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to fetch tracks'
      )
    }
  }
)

const spotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    playlists: [],
    tracks: [],
    loading: false,
    tracksLoading: false,
    error: null
  },
  reducers: {
    clearError: state => {
      state.error = null
    },
    clearTracks: state => {
      state.tracks = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlaylists.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false
        state.playlists = action.payload
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchTracks.pending, state => {
        state.tracksLoading = true
        state.error = null
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracksLoading = false
        state.tracks = action.payload
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.tracksLoading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearTracks } = spotifySlice.actions
export default spotifySlice.reducer
