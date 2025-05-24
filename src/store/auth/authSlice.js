import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = 'https://spotify-be-rr00.onrender.com/api/users'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await axios.post(`${API_URL}/login`, { email, password })
      localStorage.setItem("authToken", response.data.data.token)
      toast.success(response.data.message)
      return response.data
    } catch (err) {
      console.log('err :>> ', err)
      toast.error(err.response.data.message)
      return rejectWithValue(err.data.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await axios.post(`${API_URL}/register`, userData)
      toast.success(response.data.message)
      return response.data
    } catch (err) {
      toast.error(err.response.data.message)
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('authToken'),
    loading: false,
    error: null
  },
  reducers: {
    logout: state => {
      localStorage.removeItem('authToken')
      state.user = null
      state.token = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('action.payload :>> ', action.payload)
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
