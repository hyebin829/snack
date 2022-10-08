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
  addLike,
  removeLike,
  loadBestReview,
} from 'actions/post'
import { IpostState } from 'types/post'
import { logout } from 'actions/user'

export const initialState: IpostState = {
  popularSnackList: [],
  topRatingSnackList: [],
  topReviewSnackList: [],
  bestReviewList: [],
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
  loadBestReviewLoading: false,
  loadBestReviewDone: false,
  loadBestReviewError: null,
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
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: null,
  removeLikeLoading: false,
  removeLikeDone: false,
  removeLikeError: null,
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
      .addCase(loadBestReview.pending, (state) => {
        state.loadBestReviewLoading = true
        state.loadBestReviewDone = false
        state.loadBestReviewError = null
      })
      .addCase(loadBestReview.fulfilled, (state, action) => {
        state.loadBestReviewLoading = false
        state.loadBestReviewDone = true
        state.bestReviewList = action.payload
      })
      .addCase(loadBestReview.rejected, (state, action) => {
        state.loadBestReviewLoading = false
        state.loadBestReviewError = action.error.message
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
        state.reviewList = state.reviewList.concat(action.payload)
        state.hasMoreReview = action.payload.length === 10
        state.loadReviewsLoading = false
        state.loadReviewsDone = true
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
        const { reviewList, snackInfo, myReviewList } = state
        if (reviewList) _remove(reviewList, { id: action.payload.reviewId })
        if (snackInfo) _remove(snackInfo.Reviews, { id: action.payload.reviewId })
        if (myReviewList) _remove(myReviewList, { id: action.payload.reviewId })
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
        state.myReviewList = action.payload
      })
      .addCase(loadMyReviews.rejected, (state, action) => {
        state.loadMyReviewsLoading = false
        state.loadMyReviewsError = action.error.message
      })
      .addCase(addLike.pending, (state) => {
        state.addLikeLoading = true
        state.addLikeDone = false
        state.addLikeError = null
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const { reviewList, myReviewList, bestReviewList } = state
        const review = reviewList.find((x) => x.id === action.payload.reviewId)
        const myReview = myReviewList.find((x) => x.id === action.payload.reviewId)
        const bestReview = bestReviewList.find((x) => x.id === action.payload.reviewId)
        review?.Likers.push({ id: action.payload.userId })
        myReview?.Likers.push({ id: action.payload.userId })
        bestReview?.Likers.push({ id: action.payload.userId })
        state.addLikeLoading = false
        state.addLikeDone = true
      })
      .addCase(addLike.rejected, (state, action) => {
        state.addLikeLoading = false
        state.addLikeError = action.error.message
      })
      .addCase(removeLike.pending, (state) => {
        state.removeLikeLoading = true
        state.removeLikeDone = false
        state.removeLikeError = null
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const { reviewList, myReviewList, bestReviewList } = state
        const review = reviewList.find((x) => x.id === action.payload.reviewId)
        const myReview = myReviewList.find((x) => x.id === action.payload.reviewId)
        const bestReview = bestReviewList.find((x) => x.id === action.payload.reviewId)
        if (review) _remove(review?.Likers, { id: action.payload.userId })
        if (myReview) _remove(myReview?.Likers, { id: action.payload.userId })
        if (bestReview) _remove(bestReview?.Likers, { id: action.payload.userId })
        state.removeLikeLoading = false
        state.removeLikeDone = true
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.removeLikeLoading = false
        state.removeLikeError = action.error.message
      })
      .addCase(logout.fulfilled, (state) => {
        state.myReviewList = []
      })
      .addDefaultCase((state) => state),
})

export default postSlice
