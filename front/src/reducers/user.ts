import { createSlice } from '@reduxjs/toolkit'
import { loadMyInfo, login, logout } from 'actions/user'
import { IuserState } from 'types/user'

export const initialState: IuserState = {
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
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true
        state.loginDone = false
        state.loginError = null
      })
      .addCase(login.fulfilled, (state) => {
        state.loginLoading = false
        state.loginDone = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false
        state.loginError = action.error.message
      })
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true
        state.loadMyInfoLoading = true
        state.loadMyInfoDone = false
        state.loadMyInfoError = null
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false
        state.loadMyInfoDone = true
        state.myInfo = action.payload
      })
      .addCase(loadMyInfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false
        state.loadMyInfoError = action.error.message
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true
        state.logoutDone = false
        state.logoutError = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false
        state.logoutDone = true
        state.myInfo = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false
        state.logoutError = action.error.message
      }),
})

export default userSlice
