import Portal from 'Portal'
import styles from './loginmodal.module.scss'

type ToggleModal = {
  toggleModal: React.MouseEventHandler<HTMLButtonElement>
}

const LoginModal = ({ toggleModal }: ToggleModal) => {
  return (
    <Portal>
      <div className={styles.modalBackground}>
        <div className={styles.modalWrapper}>
          <div>로그인</div>
          <button type='button' onClick={toggleModal}>
            닫기
          </button>
          <a href='http://localhost:3065/user/kakao/login/callback'>
            <img src='/images/kakao_login_medium_narrow.png' alt='kakao login' />
          </a>
        </div>
      </div>
    </Portal>
  )
}

export default LoginModal
