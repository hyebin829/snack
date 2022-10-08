import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { loadMyInfo } from 'actions/user'
import Header from 'components/Header'
import GNB from 'components/GNB'
import ReviewFormModal from 'components/ReviewFormModal'
import ConfirmModal from 'components/ConfirmModal'
import SignUpModal from 'components/SignUpModal'
import LoginModal from 'components/LoginModal'
import Footer from 'components/Footer'
import styles from './layout.module.scss'

const Layout = () => {
  const { isLoginModalOpen, isConfirmModalOpen, isReviewModalOpen, isSignUpModalOpen } =
    useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMyInfo())
  }, [dispatch])

  useEffect(() => {
    const $body = document.querySelector('body')
    if (isReviewModalOpen || isLoginModalOpen || isConfirmModalOpen || isSignUpModalOpen) {
      $body!.style.overflow = 'hidden'
    }
    return () => {
      $body!.style.overflow = 'auto'
    }
  }, [isConfirmModalOpen, isLoginModalOpen, isReviewModalOpen, isSignUpModalOpen])

  return (
    <div className={styles.layout}>
      <Header />
      <GNB />
      <main className={styles.main}>
        {isLoginModalOpen && <LoginModal />}
        {isReviewModalOpen && <ReviewFormModal />}
        {isConfirmModalOpen && <ConfirmModal />}
        {isSignUpModalOpen && <SignUpModal />}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
