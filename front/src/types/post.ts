export interface IpostState {
  popularSnackList: IpopularSnack[]
  topRatingSnackList: ItopRatingSnack[]
  topReviewSnackList: ItopReviewSnack[]
  bestReviewList: IbestReview[]
  searchWordList: IsearchWord[]
  snackInfo: IsnackInfo | null
  reviewNumber: number
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
  loadReviewNumberLoading: boolean
  loadReviewNumberDone: boolean
  loadReviewNumberError: null | string | undefined
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

export interface IbestReview {
  id: number
  content: string
  createdAt: Date
  updatedAt: Date
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
  createdAt: Date
  updatedAt: Date
  Likers: { id: number }[]
}

export interface word {
  word: string
}

export interface snackid {
  id: string | undefined
}

export interface review {
  snackId: string | undefined
  userId: number
  content: string
  rating: number | null
  nickname: string
  profileimagesrc: string | null
}

export interface reviewId {
  lastId: number | undefined
  snackId: string | undefined
}

export interface likeReviewId {
  reviewId: number | undefined
}

export interface userReview {
  reviewId: number | undefined
  userId: number | undefined
}

export interface myId {
  userId: number | undefined
}
