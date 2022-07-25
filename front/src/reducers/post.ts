import { createSlice } from '@reduxjs/toolkit'
import { loadPopularSnack, loadTopRatingSnack } from 'actions/post'
import { IpostState } from 'types/post'

export const initialState: IpostState = {
  popularSnackList: [],
  topRatingSnackList: [],
  loadPopularSnackLoading: false,
  loadPopularSnackDone: false,
  loadPopularSnackError: null,
  loadTopRatingSnackLoading: false,
  loadTopRatingSnackDone: false,
  loadTopRatingSnackError: null,
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
      .addDefaultCase((state) => state),
})

export default postSlice
