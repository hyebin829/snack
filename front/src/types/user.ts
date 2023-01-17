export interface IuserState {
  myInfo: ImyInfo | null
  userInfo: IuserInfo | null
  loadMyInfoLoading: boolean
  loadMyInfoDone: boolean
  loadMyInfoError: null | string | undefined
  loginLoading: boolean
  loginDone: boolean
  loginError: null | string | undefined
  logoutLoading: boolean
  logoutDone: boolean
  logoutError: null | string | undefined
  signupLoading: boolean
  signupDone: boolean
  signupError: null | string | undefined
  addFavoriteLoading: boolean
  addFavoriteDone: boolean
  addFavoriteError: null | string | undefined
  removeFavoriteLoading: boolean
  removeFavoriteDone: boolean
  removeFavoriteError: null | string | undefined
  changeNicknameLoading: boolean
  changeNicknameDone: boolean
  changeNicknameError: null | string | undefined
  profileImagePath: Array<string> | null
  uploadImageLoading: boolean
  uploadImageDone: boolean
  uploadImageError: null | string | undefined
  editProfileImageLoading: boolean
  editProfileImageDone: boolean
  editProfileImageError: null | string | undefined
}

interface ImyInfo {
  id: number
  email: string
  nickname: string
  profileimagesrc: string | null
  format: string | null
  Reviews: IuserReview[]
  Favorited: Ifavorite[]
}

interface IuserReview {
  id: number
  UserId: number
  content: string
  rating: number
}

export interface Ifavorite {
  Favorite: {
    SnackId: number
    UserId: number
    createdAt: string
    updatedAt: string
  }
  brand: string
  country: string
  id: number
  imagesrc: string
  name: string
}

interface IuserInfo {}

export interface userNickname {
  nickname: string | undefined
}

export interface profileImagesrc {
  imagesrc: string[] | null
}

export interface loginInfo {
  email: string
  password: string
}

export interface signupInfo {
  email: string
  password: string
  nickname: string
}
