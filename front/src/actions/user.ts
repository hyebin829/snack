import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { snackid } from 'types/post'
import { userNickname } from 'types/user'

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

export const changeNickname = createAsyncThunk(
  'user/changeNickname',
  async (data: userNickname) => {
    const response = await axios.patch(`/user/nickname`, data)
    return response.data
  }
)

export const uploadImage = createAsyncThunk(
  'user/image',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/image', data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

type imgsrc = {
  imagesrc: string[] | null
}

export const editProfileimage = createAsyncThunk(
  'user/uploadProfileimage',
  async (data: imgsrc) => {
    const response = await axios.patch(`/user/profileimage`, data)
    return response.data
  }
)
