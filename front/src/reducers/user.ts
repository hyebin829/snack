import { createSlice } from '@reduxjs/toolkit'
import {
  addFavorite,
  changeNickname,
  loadMyInfo,
  login,
  logout,
  removeFavorite,
  uploadProfileimage,
} from 'actions/user'
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
  addFavoriteLoading: false,
  addFavoriteDone: false,
  addFavoriteError: null,
  removeFavoriteLoading: false,
  removeFavoriteDone: false,
  removeFavoriteError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  profileImagePath: [],
  uploadProfileImageLoading: false,
  uploadProfileImageDone: false,
  uploadProfileImageError: null,
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
      })
      .addCase(addFavorite.pending, (state) => {
        state.addFavoriteLoading = true
        state.addFavoriteDone = false
        state.addFavoriteError = null
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { myInfo } = state
        state.addFavoriteLoading = false
        state.addFavoriteDone = true
        myInfo?.Favorited.push(action.payload)
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.addFavoriteLoading = false
        state.addFavoriteError = action.error.message
      })
      .addCase(removeFavorite.pending, (state) => {
        state.removeFavoriteLoading = true
        state.removeFavoriteDone = false
        state.removeFavoriteError = null
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const { myInfo } = state
        state.removeFavoriteLoading = false
        state.removeFavoriteDone = true
        myInfo?.Favorited.filter((favorite) => favorite.id !== action.payload.SnackId)
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.removeFavoriteLoading = false
        state.removeFavoriteError = action.error.message
      })
      .addCase(changeNickname.pending, (state) => {
        state.changeNicknameLoading = true
        state.changeNicknameDone = false
        state.changeNicknameError = null
      })
      .addCase(changeNickname.fulfilled, (state, action) => {
        state.changeNicknameLoading = false
        state.changeNicknameDone = true
        if (state.myInfo) {
          state.myInfo.nickname = action.payload.nickname
        }
      })
      .addCase(changeNickname.rejected, (state, action) => {
        state.changeNicknameLoading = false
        state.changeNicknameError = action.error.message
      })
      .addCase(uploadProfileimage.pending, (state) => {
        state.uploadProfileImageLoading = true
        state.uploadProfileImageDone = false
        state.uploadProfileImageError = null
      })
      .addCase(uploadProfileimage.fulfilled, (state, action) => {
        state.profileImagePath = action.payload
        state.uploadProfileImageLoading = false
        state.uploadProfileImageDone = true
        state.profileImagePath = null
      })
      .addCase(uploadProfileimage.rejected, (state, action) => {
        state.uploadProfileImageLoading = false
        state.uploadProfileImageError = action.error.message
      })
      .addDefaultCase((state) => state),
})

export default userSlice
