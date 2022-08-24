import Portal from 'Portal'
import styles from './loginmodal.module.scss'
import { IoMdClose } from 'react-icons/io'

type ToggleModal = {
  toggleModal: React.MouseEventHandler<HTMLButtonElement>
}

const LoginModal = ({ toggleModal }: ToggleModal) => {
  return (
    <Portal>
      <div className={styles.modalBackground}>
        <div className={styles.modalWrapper}>
          <h2>SNACK</h2>
          <div className={styles.loginTitle}>
            카카오 로그인으로 <br />
            간편하게 이용이 가능합니다.
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
