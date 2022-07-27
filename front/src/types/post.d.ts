export interface IpostState {
  popularSnackList: IpopularSnack[]
  topRatingSnackList: ItopRatingSnack[]
  topReviewSnackList: ItopReviewSnack[]
  searchWordList: IsearchWord[]
  snackInfo: IsnackInfo[]
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

interface Ireview {
  id: number
  SnackId: number
  content: string
  rating: number
}
