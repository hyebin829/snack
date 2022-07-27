import { createSlice } from '@reduxjs/toolkit'
import { loadPopularSnack, loadSearchWord, loadSnackInfo, loadTopRatingSnack, loadTopReviewSnack } from 'actions/post'
import { IpostState } from 'types/post'

export const initialState: IpostState = {
  popularSnackList: [],
  topRatingSnackList: [],
  topReviewSnackList: [],
  searchWordList: [],
  snackInfo: [],
  loadPopularSnackLoading: false,
  loadPopularSnackDone: false,
  loadPopularSnackError: null,
  loadTopRatingSnackLoading: false,
  loadTopRatingSnackDone: false,
  loadTopRatingSnackError: null,
  loadTopReviewSnackLoading: false,
  loadTopReviewSnackDone: false,
  loadTopReviewSnackError: null,
  loadSearchWordLoading: false,
  loadSearchWordDone: false,
  loadSearchWordError: null,
  loadSnackInfoLoading: false,
  loadSnackInfoDone: false,
  loadSnackInfoError: null,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadPopularSnack.pending, (state) => {
        state.loadPopularSnackLoading = true
        state.loadPopularSnackDone = false
        state.loadPopularSnackError = null
      })
      .addCase(loadPopularSnack.fulfilled, (state, action) => {
        state.loadPopularSnackLoading = false
        state.loadPopularSnackDone = true
        state.popularSnackList = action.payload
      })
      .addCase(loadPopularSnack.rejected, (state, action) => {
        state.loadPopularSnackLoading = false
        state.loadPopularSnackError = action.error.message
      })
      .addCase(loadTopRatingSnack.pending, (state) => {
        state.loadTopRatingSnackLoading = true
        state.loadTopRatingSnackDone = false
        state.loadTopRatingSnackError = null
      })
      .addCase(loadTopRatingSnack.fulfilled, (state, action) => {
        state.loadTopRatingSnackLoading = false
        state.loadTopRatingSnackDone = true
        state.topRatingSnackList = action.payload
      })
      .addCase(loadTopRatingSnack.rejected, (state, action) => {
        state.loadTopRatingSnackLoading = false
        state.loadTopRatingSnackError = action.error.message
      })
      .addCase(loadTopReviewSnack.pending, (state) => {
        state.loadTopReviewSnackLoading = true
        state.loadTopReviewSnackDone = false
        state.loadTopReviewSnackError = null
      })
      .addCase(loadTopReviewSnack.fulfilled, (state, action) => {
        state.loadTopReviewSnackLoading = false
        state.loadTopReviewSnackDone = true
        state.topReviewSnackList = action.payload
      })
      .addCase(loadTopReviewSnack.rejected, (state, action) => {
        state.loadTopReviewSnackLoading = false
        state.loadTopReviewSnackError = action.error.message
      })
      .addCase(loadSearchWord.pending, (state) => {
        state.loadSearchWordLoading = true
        state.loadSearchWordDone = false
        state.loadSearchWordError = null
      })
      .addCase(loadSearchWord.fulfilled, (state, action) => {
        state.loadSearchWordLoading = false
        state.loadSearchWordDone = true
        state.searchWordList = action.payload
      })
      .addCase(loadSearchWord.rejected, (state, action) => {
        state.loadSearchWordLoading = false
        state.loadSearchWordError = action.error.message
      })
      .addCase(loadSnackInfo.pending, (state) => {
        state.loadSnackInfoLoading = true
        state.loadSnackInfoDone = false
        state.loadSnackInfoError = null
      })
      .addCase(loadSnackInfo.fulfilled, (state, action) => {
        state.loadSnackInfoLoading = false
        state.loadSnackInfoDone = true
        state.snackInfo = action.payload
      })
      .addCase(loadSnackInfo.rejected, (state, action) => {
        state.loadSnackInfoLoading = false
        state.loadSnackInfoError = action.error.message
      })
      .addDefaultCase((state) => state),
})

export default postSlice
