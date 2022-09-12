import { logout } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { openLoginModal } from 'reducers/modal'
import styles from './header.module.scss'

const Header = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleOpenModal = () => {
    dispatch(openLoginModal())
  }

  return (
    <header className={styles.header}>
      <h1>SNACK</h1>
      {myInfo?.id ? (
        <button type='button' onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <button type='button' onClick={handleOpenModal}>
          로그인
        </button>
      )}
    </header>
  )
}

export default Header
