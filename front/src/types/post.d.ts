export interface IpostState {
  popularSnackList: IpopularSnack[]
  topRatingSnackList: ItopratingSnack[]
  loadPopularSnackLoading: boolean
  loadPopularSnackDone: boolean
  loadPopularSnackError: null | string | undefined
  loadTopRatingSnackLoading: boolean
  loadTopRatingSnackDone: boolean
  loadTopRatingSnackError: null | string | undefined
}

interface IpopularSnack {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
  count: number
}

interface ItopratingSnack {
  id: number
  name: string
  brand: string
  imagesrc: string
  country: string
  rating: number
}
