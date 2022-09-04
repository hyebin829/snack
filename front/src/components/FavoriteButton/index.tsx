import { addFavorite, removeFavorite } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useParams } from 'react-router-dom'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { IsnackInfo } from 'types/post'
import styles from './favoriteButton.module.scss'

type snackinfo = {
  snackInfo: IsnackInfo | null
}

const FavoriteButton = ({ snackInfo }: snackinfo) => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { myInfo } = useAppSelector((state) => state.user)

  const followed = snackInfo?.Favorites.filter((favorite) => favorite.id === myInfo?.id)

  const onClickaddFavoriteButton = () => {
    dispatch(addFavorite({ id: snackId }))
  }

  const onClickremoveFavoriteButton = () => {
    dispatch(removeFavorite({ id: snackId }))
  }

  return followed?.length ? (
    <button type='button' onClick={onClickremoveFavoriteButton} className={styles.favoriteButton}>
      <IoMdHeart size={25} color='pink' />
    </button>
  ) : (
    <button type='button' onClick={onClickaddFavoriteButton} className={styles.favoriteButton}>
      <IoMdHeartEmpty size={25} color='pink' />
    </button>
  )
}

export default FavoriteButton
