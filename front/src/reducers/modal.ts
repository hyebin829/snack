import { createSlice } from '@reduxjs/toolkit'
import { ImodalState } from 'types/modal'

export const initialState: ImodalState = {
  isLoginModalOpen: false,
  isConfirmModalOpen: false,
  isReviewModalOpen: false,
  reviewId: undefined,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false
    },
    openConfirmModal: (state, action) => {
      state.isConfirmModalOpen = true
      state.reviewId = action.payload
    },
    closeConfirmModal: (state) => {
      state.isConfirmModalOpen = false
      state.reviewId = undefined
    },
    openReviewModal: (state) => {
      state.isReviewModalOpen = true
    },
    closeReviewModal: (state) => {
      state.isReviewModalOpen = false
    },
  },
})

export const {
  openLoginModal,
  closeLoginModal,
  openConfirmModal,
  closeConfirmModal,
  openReviewModal,
  closeReviewModal,
} = modalSlice.actions

export default modalSlice
