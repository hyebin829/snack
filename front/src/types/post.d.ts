export interface IpostState {
  popularSnackList: IpopularSnack[]
  topRatingSnackList: ItopRatingSnack[]
  topReviewSnackList: ItopReviewSnack[]
  searchWordList: IsearchWord[]
  snackInfo: IsnackInfo | null
  rating: null | number
  reviewList: Ireview[]
  hasMoreReview: boolean
  loadPopularSnackLoading: boolean
  loadPopularSnackDone: boolean
  loadPopularSnackError: null | string | undefined
  loadTopRatingSnackLoading: boolean
  loadTopRatingSnackDone: boolean
  loadTopRatingSnackError: null | string | undefined
  loadTopReviewSnackLoading: boolean
  loadTopReviewSnackDone: boolean
  loadTopReviewSnackError: null | string | undefined
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
}

export interface Ireview {
  id: number
  SnackId: number
  content: string
  rating: number
  UserId: number
  User: { id: number; nickname: string }
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
}

export type reviewId = {
  lastId: number | undefined
  snackId: string | undefined
}
