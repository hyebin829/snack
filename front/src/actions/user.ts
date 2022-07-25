import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
  const response = await axios.get('/user')
  return response.data
})

// export const loadUser = createAsyncThunk('user/loadUser', async (data, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`/user/${data.userId}`)
//     return response.data
//   } catch (error) {
//     return rejectWithValue(error.response.data)
//   }
// })

export const login = createAsyncThunk('user/login', async () => {
  const response = await axios.get('/user/kakao/login')
  return response.data
})

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axios.post('/user/logout')
  return response.data
})
