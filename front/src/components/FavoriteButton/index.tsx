import { addFavorite, removeFavorite } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useParams } from 'react-router-dom'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'

import styles from './favoriteButton.module.scss'

const FavoriteButton = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { myInfo } = useAppSelector((state) => state.user)

  const followed = myInfo?.Favorited.find((favorite) => favorite?.id === Number(snackId))

  const onClickFavoriteButton = () => {
    if (followed) {
      dispatch(removeFavorite({ id: snackId }))
    } else {
      dispatch(addFavorite({ id: snackId }))
    }
  }

  return (
    <button type='button' onClick={onClickFavoriteButton} className={styles.favoriteButton}>
      {followed ? <IoMdHeart size={25} color='pink' /> : <IoMdHeartEmpty size={25} color='pink' />}
    </button>
  )
}

export default FavoriteButton
