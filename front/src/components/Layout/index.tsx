import { loadMyInfo } from 'actions/user'
import GNB from 'components/GNB'
import Header from 'components/Header'
import LoginModal from 'components/LoginModal'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import ReviewFormModal from 'components/ReviewFormModal'
import ConfirmModal from 'components/ConfirmModal'

const Layout = () => {
  const { isLoginModalOpen, isConfirmModalOpen, isReviewModalOpen } = useAppSelector(
    (state) => state.modal
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMyInfo())
  }, [dispatch])

  useEffect(() => {
    const $body = document.querySelector('body')
    if (isReviewModalOpen || isLoginModalOpen || isConfirmModalOpen) {
      $body!.style.overflow = 'hidden'
    }

    return () => {
      $body!.style.overflow = 'auto'
    }
  }, [isConfirmModalOpen, isLoginModalOpen, isReviewModalOpen])

  return (
    <div className={styles.layout}>
      <Header />
      <GNB />
      <main>
        {isLoginModalOpen && <LoginModal />}
        {isReviewModalOpen && <ReviewFormModal />}
        {isConfirmModalOpen && <ConfirmModal />}
        <Outlet />
      </main>
      <footer />
    </div>
  )
}

export default Layout
