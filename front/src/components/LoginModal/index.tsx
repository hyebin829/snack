/* eslint-disable jsx-a11y/no-static-element-interactions */
import Portal from 'Portal'
import styles from './loginmodal.module.scss'
import { IoMdClose } from 'react-icons/io'
import { Dispatch, MouseEvent, SetStateAction, useRef } from 'react'

type ToggleModal = {
  toggleModal: React.MouseEventHandler<HTMLButtonElement>
  setIsModalView: Dispatch<SetStateAction<boolean>>
}

const LoginModal = ({ toggleModal, setIsModalView }: ToggleModal) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const clickdiv = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setIsModalView(false)
    }
  }

  return (
    <Portal>
      <div className={styles.modalBackground} ref={modalRef} onClick={clickdiv}>
        <div className={styles.modalWrapper}>
          <h2>SNACK</h2>
          <div className={styles.loginTitle}>
            카카오 로그인으로 <br />
            간편하게 로그인이 가능합니다.
          </div>
          <button type='button' onClick={toggleModal}>
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
