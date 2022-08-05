import { logout } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

type ToggleModal = {
  toggleModal: React.MouseEventHandler<HTMLButtonElement>
}
const Header = ({ toggleModal }: ToggleModal) => {
  const { myInfo } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      SNACK
      {myInfo?.id ? (
        <button type='button' onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <button type='button' onClick={toggleModal}>
          로그인
        </button>
      )}
    </header>
  )
}

export default Header
