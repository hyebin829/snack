/* eslint-disable jsx-a11y/no-static-element-interactions */
import Portal from 'Portal'
import styles from './loginmodal.module.scss'
import { IoMdClose } from 'react-icons/io'
import { MouseEvent, useRef, useState, ChangeEvent } from 'react'
import { closeLoginModal, openSignUpModal } from 'reducers/modal'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { login } from 'actions/user'

const LoginModal = () => {
  const dispatch = useAppDispatch()
  const { loginError } = useAppSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const clickdiv = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      dispatch(closeLoginModal())
    }
  }

  const handleOpenSignUpModal = () => {
    dispatch(closeLoginModal())
    dispatch(openSignUpModal())
  }

  const handleCloseModal = () => {
    dispatch(closeLoginModal())
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmitForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(true)
    dispatch(login({ email, password }))
  }

  return (
    <Portal>
      <div className={styles.modalBackground} ref={modalRef} onClick={clickdiv}>
        <div className={styles.modalWrapper}>
          <h2>SNACKPEDIA</h2>
          <div className={styles.needLogin}>로그인 후 서비스를 이용해주세요.</div>
          <form onSubmit={onSubmitForm}>
            <label htmlFor='email'>이메일</label>
            <input
              id='email'
              type='text'
              name='user-email'
              value={email}
              onChange={onChangeEmail}
              required
            />
            <label htmlFor='password'>비밀번호</label>
            <input
              id='password'
              type='password'
              name='user-password'
              value={password}
              onChange={onChangePassword}
              required
            />
            {errorMessage && loginError && <div className={styles.errorMessage}>{loginError}</div>}
            <div className={styles.buttonWrapper}>
              <button className={styles.loginButton} type='submit'>
                로그인
              </button>
              <button className={styles.signUpButton} type='button' onClick={handleOpenSignUpModal}>
                회원가입하기
              </button>
            </div>
          </form>
          <div className={styles.loginTitle}>
            카카오 로그인으로 <br />
            간편하게 회원가입 및 로그인이 가능합니다.
          </div>
          <button type='button' onClick={handleCloseModal} className={styles.closeButton}>
            <IoMdClose size={20} />
          </button>
          <a href='http://localhost:3065/user/kakao/login'>
            <img src='/images/kakao_login_medium_narrow.png' alt='kakao login' />
          </a>
        </div>
      </div>
    </Portal>
  )
}

export default LoginModal
