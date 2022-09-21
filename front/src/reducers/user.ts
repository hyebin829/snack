import _remove from 'lodash/remove'
import { createSlice } from '@reduxjs/toolkit'
import {
  addFavorite,
  changeNickname,
  loadMyInfo,
  login,
  logout,
  removeFavorite,
  uploadImage,
  editProfileimage,
  signup,
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
  signupLoading: false,
  signupDone: false,
  signupError: null,
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
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  editProfileImageLoading: false,
  editProfileImageDone: false,
  editProfileImageError: null,
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
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false
        state.loginDone = true
        state.myInfo = action.payload
        state.loginError = null
        state.signupError = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false
        state.loginError = `${action.payload}`
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
        state.changeNicknameDone = false
        state.editProfileImageDone = false
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
      .addCase(signup.pending, (state) => {
        state.signupLoading = true
        state.signupDone = false
        state.signupError = null
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupLoading = false
        state.signupDone = true
        state.loginError = null
        state.signupError = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false
        state.signupError = `${action.payload}`
      })
      .addCase(addFavorite.pending, (state) => {
        state.addFavoriteLoading = true
        state.addFavoriteDone = false
        state.addFavoriteError = null
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { myInfo } = state
        myInfo?.Favorited.push(action.payload)
        state.addFavoriteLoading = false
        state.addFavoriteDone = true
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
        if (myInfo) {
          _remove(myInfo.Favorited, { id: action.payload.id })
        }
        state.removeFavoriteLoading = false
        state.removeFavoriteDone = true
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
      .addCase(uploadImage.pending, (state) => {
        state.uploadImageLoading = true
        state.uploadImageDone = false
        state.uploadImageError = null
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.profileImagePath = action.payload
        state.uploadImageLoading = false
        state.uploadImageDone = true
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadImageLoading = false
        state.uploadImageError = `${action.payload}`
        state.profileImagePath = []
      })
      .addCase(editProfileimage.pending, (state) => {
        state.editProfileImageLoading = true
        state.editProfileImageDone = false
        state.editProfileImageError = null
      })
      .addCase(editProfileimage.fulfilled, (state, action) => {
        state.profileImagePath = []
        const { myInfo } = state
        if (myInfo) {
          myInfo.profileimagesrc = action.payload
        }
        state.editProfileImageLoading = false
        state.editProfileImageDone = true
        state.uploadImageError = null
      })
      .addCase(editProfileimage.rejected, (state, action) => {
        state.editProfileImageLoading = false
        state.editProfileImageError = action.error.message
      })
      .addDefaultCase((state) => state),
})

export default userSlice
