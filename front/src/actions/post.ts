import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true

export const loadPopularSnack = createAsyncThunk('post/loadPopularSnack', async () => {
  const response = await axios.get('/post/popularsnack')
  return response.data
})

export const loadTopRatingSnack = createAsyncThunk('post/loadTopRatingSnack', async () => {
  const response = await axios.get('/post/topratingsnack')
  return response.data
})

export const loadTopReviewSnack = createAsyncThunk('post/loadTopReviewSnack', async () => {
  const response = await axios.get('/post/topreview')
  return response.data
})

export const loadSearchWord = createAsyncThunk('post/loadSearchWord', async (data: word) => {
  const response = await axios.get(`/post/searchresult?word=${data.word}`)
  return response.data
})

export const loadSnackInfo = createAsyncThunk('post/loadSnackInfo', async (data: snackid) => {
  const response = await axios.get(`/post/loadsnackinfo/${data.id}`)
  return response.data
})

export const addReview = createAsyncThunk('post/addReview', async (data: review) => {
  const response = await axios.post(`/post/${data.snackId}/review`, data)
  return response.data
})

type word = {
  word: string
}

type snackid = {
  id: string | undefined
}

type review = {
  snackId: string | undefined
  userId: number
  content: string
  rating: number | null
}
