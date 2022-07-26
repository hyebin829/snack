export interface IpostState {
  popularSnackList: IpopularSnack[]
  topRatingSnackList: ItopRatingSnack[]
  topReviewSnackList: ItopReviewSnack[]
  searchWordList: IsearchWord[]
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
