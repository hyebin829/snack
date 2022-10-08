import { Link, NavLink } from 'react-router-dom'
import cx from 'classnames'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { openLoginModal, openSignUpModal } from 'reducers/modal'
import { logout } from 'actions/user'
import styles from './header.module.scss'

const Header = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal())
  }

  const handleOpenSignupModal = () => {
    dispatch(openSignUpModal())
  }

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <Link to='/'>
          <h1>SNACKPEDIA</h1>
        </Link>
        <ul>
          <li>
            <NavLink to='/search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              과자 검색
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile'
              className={({ isActive }) => cx({ [styles.isActive]: isActive })}
            >
              프로필
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.buttonWrapper}>
        {myInfo?.id ? (
          <button className={styles.logout} type='button' onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <div>
            <button type='button' onClick={handleOpenLoginModal}>
              로그인
            </button>
            <button type='button' onClick={handleOpenSignupModal} className={styles.signUpButton}>
              회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
