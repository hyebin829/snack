import { loadMyInfo } from 'actions/user'
import GNB from 'components/GNB'
import Header from 'components/Header'
import LoginModal from 'components/LoginModal'
import { useAppDispatch } from 'hooks/useRedux'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'

const Layout = () => {
  const [isModalView, setIsModalView] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMyInfo())
  }, [dispatch])

  useEffect(() => {
    const $body = document.querySelector('body')
    if (isModalView) {
      $body!.style.overflow = 'hidden'
    }

    return () => {
      $body!.style.overflow = 'auto'
    }
  }, [isModalView])

  const toggleModal = () => {
    setIsModalView((prev) => !prev)
  }

  return (
    <div className={styles.layout}>
      <Header toggleModal={toggleModal} />
      <GNB />
      <main>
        {isModalView && <LoginModal toggleModal={toggleModal} />}
        <Outlet />
      </main>
      <footer />
    </div>
  )
}

export default Layout
