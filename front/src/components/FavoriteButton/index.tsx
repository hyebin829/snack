import { addFavorite, removeFavorite } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { openLoginModal } from 'reducers/modal'

import styles from './favoriteButton.module.scss'

type snackid = {
  snackId: string | undefined
}

const FavoriteButton = ({ snackId }: snackid) => {
  const dispatch = useAppDispatch()
  const { myInfo } = useAppSelector((state) => state.user)

  const followed = myInfo?.Favorited.find((favorite) => favorite?.id === Number(snackId))

  const onClickFavoriteButton = () => {
    if (!myInfo?.id) dispatch(openLoginModal())
    if (followed) {
      dispatch(removeFavorite({ id: snackId }))
    } else {
      dispatch(addFavorite({ id: snackId }))
    }
  }

  return (
    <button type='button' onClick={onClickFavoriteButton} className={styles.favoriteButton}>
      {followed ? (
        <IoMdHeart size={25} color='#ff8b96' />
      ) : (
        <IoMdHeartEmpty size={25} color='pink' />
      )}
    </button>
  )
}

export default FavoriteButton
