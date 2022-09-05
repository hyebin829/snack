import _remove from 'lodash/remove'
import { createSlice } from '@reduxjs/toolkit'
import {
  addReview,
  removeReview,
  loadPopularSnack,
  loadReviews,
  loadSearchWord,
  loadSnackInfo,
  loadTopRatingSnack,
  loadTopReviewSnack,
  loadMyReviews,
} from 'actions/post'
import { IpostState } from 'types/post'

export const initialState: IpostState = {
  popularSnackList: [],
  topRatingSnackList: [],
  topReviewSnackList: [],
  searchWordList: [],
  snackInfo: null,
  rating: null,
  reviewList: [],
  myReviewList: [],
  hasMoreReview: true,
  hasMoreMyReview: true,
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
  addReviewLoading: false,
  addReviewDone: false,
  addReviewError: null,
  loadReviewsLoading: false,
  loadReviewsDone: false,
  loadReviewsError: null,
  removeReviewLoading: false,
  removeReviewDone: false,
  removeReviewError: null,
  loadMyReviewsLoading: false,
  loadMyReviewsDone: false,
  loadMyReviewsError: null,
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
        state.hasMoreReview = true
        state.reviewList = []
      })
      .addCase(loadSnackInfo.fulfilled, (state, action) => {
        state.loadSnackInfoLoading = false
        state.loadSnackInfoDone = true
        state.snackInfo = action.payload[0]
      })
      .addCase(loadSnackInfo.rejected, (state, action) => {
        state.loadSnackInfoLoading = false
        state.loadSnackInfoError = action.error.message
      })
      .addCase(addReview.pending, (state) => {
        state.addReviewLoading = true
        state.addReviewDone = false
        state.addReviewError = null
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { snackInfo, reviewList, myReviewList } = state
        console.log(action.payload)
        state.addReviewLoading = false
        state.addReviewDone = true
        state.hasMoreReview = true
        reviewList.unshift(action.payload)
        myReviewList.unshift(action.payload)
        snackInfo?.Reviews.push(action.payload)
      })
      .addCase(addReview.rejected, (state, action) => {
        state.addReviewLoading = false
        state.addReviewError = action.error.message
      })
      .addCase(loadReviews.pending, (state) => {
        state.loadReviewsLoading = true
        state.loadReviewsDone = false
        state.loadReviewsError = null
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.loadReviewsLoading = false
        state.loadReviewsDone = true
        state.reviewList = state.reviewList.concat(action.payload)
        state.hasMoreReview = action.payload.length === 10
      })
      .addCase(loadReviews.rejected, (state, action) => {
        state.loadReviewsLoading = false
        state.loadReviewsError = action.error.message
      })
      .addCase(removeReview.pending, (state) => {
        state.removeReviewLoading = true
        state.removeReviewDone = false
        state.removeReviewError = null
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        const { reviewList, snackInfo } = state
        if (reviewList) {
          _remove(reviewList, { id: action.payload.reviewId })
        }
        if (snackInfo) {
          _remove(snackInfo.Reviews, { id: action.payload.reviewId })
        }
        state.removeReviewLoading = false
        state.removeReviewDone = true
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.removeReviewLoading = false
        state.removeReviewError = action.error.message
      })
      .addCase(loadMyReviews.pending, (state) => {
        state.loadMyReviewsLoading = true
        state.loadMyReviewsDone = false
        state.loadMyReviewsError = null
      })
      .addCase(loadMyReviews.fulfilled, (state, action) => {
        state.loadMyReviewsLoading = false
        state.loadMyReviewsDone = true
        state.myReviewList = state.myReviewList.concat(action.payload)
        state.hasMoreMyReview = action.payload.length === 10
      })
      .addCase(loadMyReviews.rejected, (state, action) => {
        state.loadMyReviewsLoading = false
        state.loadMyReviewsError = action.error.message
      })
      .addDefaultCase((state) => state),
})

export default postSlice
