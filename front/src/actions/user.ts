import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { snackid } from 'types/post'

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
  const response = await axios.get('/user')
  return response.data
})

export const login = createAsyncThunk('user/login', async () => {
  const response = await axios.get('/user/kakao/login')
  return response.data
})

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axios.post('/user/logout')
  return response.data
})

export const addFavorite = createAsyncThunk('user/addFavorite', async (data: snackid) => {
  const response = await axios.patch(`/user/${data.id}/favorite`)
  return response.data
})

export const removeFavorite = createAsyncThunk('user/removeFavorite', async (data: snackid) => {
  const response = await axios.delete(`/user/${data.id}/favorite`)
  return response.data
})
