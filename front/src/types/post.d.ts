export interface IpostState {
  popularSnackList: IpopularSnack[]
  topRatingSnackList: ItopRatingSnack[]
  topReviewSnackList: ItopReviewSnack[]
  bestReviewList: IbestReview[]
  searchWordList: IsearchWord[]
  snackInfo: IsnackInfo | null
  rating: null | number
  reviewList: Ireview[]
  myReviewList: Ireview[]
  hasMoreReview: boolean
  hasMoreMyReview: boolean
  loadPopularSnackLoading: boolean
  loadPopularSnackDone: boolean
  loadPopularSnackError: null | string | undefined
  loadTopRatingSnackLoading: boolean
  loadTopRatingSnackDone: boolean
  loadTopRatingSnackError: null | string | undefined
  loadTopReviewSnackLoading: boolean
  loadTopReviewSnackDone: boolean
  loadTopReviewSnackError: null | string | undefined
  loadBestReviewLoading: boolean
  loadBestReviewDone: boolean
  loadBestReviewError: null | string | undefined
  loadSearchWordLoading: boolean
  loadSearchWordDone: boolean
  loadSearchWordError: null | string | undefined
  loadSnackInfoLoading: boolean
  loadSnackInfoDone: boolean
  loadSnackInfoError: null | string | undefined
  addReviewLoading: boolean
  addReviewDone: boolean
  addReviewError: null | string | undefined
  loadReviewsLoading: boolean
  loadReviewsDone: boolean
  loadReviewsError: null | string | undefined
  removeReviewLoading: boolean
  removeReviewDone: boolean
  removeReviewError: null | string | undefined
  loadMyReviewsLoading: boolean
  loadMyReviewsDone: boolean
  loadMyReviewsError: null | string | undefined
  addLikeLoading: boolean
  addLikeDone: boolean
  addLikeError: null | string | undefined
  removeLikeLoading: boolean
  removeLikeDone: boolean
  removeLikeError: null | string | undefined
}

interface IpopularSnack {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
  count: number
}

interface ItopRatingSnack {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
  rating: number
}

interface ItopReviewSnack {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
  count: number
}

interface IbestReview {
  id: number
  content: string
  createdAt: date
  updatedAt: date
  UserId: number
  SnackId: number
  rating: number
  count: number
  nickname: string
  profileimagesrc: null | string
  Likers: { id: number }[]
}

interface IsearchWord {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
}

interface IsnackInfo {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
  Reviews: Ireview[]
  Favorites: Ifavorited[]
}

interface Ifavorited {
  Favorite: {
    SnackId: number
    UserId: number
    createdAt: string | null
    createdAt: string | null
  }
  id: number
}

export interface Ireview {
  id: number
  Snack: { name: string; brand: string; imagesrc: string }
  SnackId: number
  content: string
  rating: number
  UserId: number
  User?: { id: number; nickname: string; profileimagesrc: string | null }
  createdAt: date
  updatedAt: date
  Likers: { id: number }[]
}

type like = {
  ReviewId: number
  UserId: number
  createdAt: date
  updatedAt: date
}

export type word = {
  word: string
}

export type snackid = {
  id: string | undefined
}

export type review = {
  snackId: string | undefined
  userId: number
  content: string
  rating: number | null
  nickname: string
  profileimagesrc: string | null
}

export type reviewId = {
  lastId: number | undefined
  snackId: string | undefined
}

export type likeReviewId = {
  reviewId: number | undefined
}

export type userReview = {
  reviewId: number | undefined
  userId: number | undefined
}

export type myId = {
  userId: number | undefined
}
