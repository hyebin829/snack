export interface IuserState {
  myInfo: ImyInfo[]
  userInfo: IuserInfo[]
  loadMyInfoLoading: boolean
  loadMyInfoDone: boolean
  loadMyInfoError: null | string | undefined
  loginLoading: boolean
  loginDone: boolean
  loginError: null | string | undefined
  logoutLoading: boolean
  logoutDone: boolean
  logoutError: null | string | undefined
}

interface ImyInfo {
  id: number
  email: string
  nickname: string
  profileimagesrc: string | null
  format: string | null
  Reviews: IuserReview[]
}

interface IuserReview {
  id: number
  UserId: number
}

interface IuserInfo {}
