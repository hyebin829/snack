import { addFavorite, removeFavorite } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { openLoginModal } from 'reducers/modal'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import styles from './favoriteButton.module.scss'

type snackid = {
  snackId: string | undefined
}

const FavoriteButton = ({ snackId }: snackid) => {
  const dispatch = useAppDispatch()
  const { myInfo } = useAppSelector((state) => state.user)

  const followed = myInfo?.Favorited.find((favorite) => favorite?.id === Number(snackId))

  const onClickFavoriteButton = () => {
    if (!myInfo?.id) {
      dispatch(openLoginModal())
      return
    }
    if (followed) {
      dispatch(removeFavorite({ id: snackId }))
    } else {
      dispatch(addFavorite({ id: snackId }))
    }
  }

  return (
    <button
      type='button'
      onClick={onClickFavoriteButton}
      className={styles.favoriteButton}
      aria-label='favorite toggle'
    >
      {followed ? (
        <IoMdHeart size={25} color='#ff7134' />
      ) : (
        <IoMdHeartEmpty size={25} color='#ff7134' />
      )}
    </button>
  )
}

export default FavoriteButton
