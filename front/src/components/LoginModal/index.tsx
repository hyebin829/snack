/* eslint-disable jsx-a11y/no-static-element-interactions */
import Portal from 'Portal'
import styles from './loginmodal.module.scss'
import { IoMdClose } from 'react-icons/io'
import { MouseEvent, useRef } from 'react'
import { closeLoginModal } from 'reducers/modal'
import { useAppDispatch } from 'hooks/useRedux'

const LoginModal = () => {
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null)
  const clickdiv = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      dispatch(closeLoginModal())
    }
  }

  const handleCloseModal = () => {
    dispatch(closeLoginModal())
  }

  return (
    <Portal>
      <div className={styles.modalBackground} ref={modalRef} onClick={clickdiv}>
        <div className={styles.modalWrapper}>
          <h2>SNACKPEDIA</h2>
          <div className={styles.needLogin}>로그인 후 서비스를 이용해주세요.</div>
          <div className={styles.loginTitle}>
            카카오 로그인으로 <br />
            간편하게 회원가입 및 로그인이 가능합니다.
          </div>
          <button type='button' onClick={handleCloseModal}>
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
