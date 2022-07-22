import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true

export const loadPopularSnack = createAsyncThunk('post/loadPopularSnack', async () => {
  const response = await axios.get('/post/popularsnack')
  console.log(response.data)
  return response.data
})

export const loadTopRatingSnack = createAsyncThunk('post/loadTopRatingSnack', async () => {
  const response = await axios.get('/post/topratingsnack')
  console.log(response.data)
  return response.data
})
