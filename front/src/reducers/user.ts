import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  myInfo: null,
  userInfo: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice
