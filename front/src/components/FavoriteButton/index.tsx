import { addFavorite, removeFavorite } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useParams } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
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
      <AiFillStar size={25} />
    </button>
  ) : (
    <button type='button' onClick={onClickaddFavoriteButton} className={styles.favoriteButton}>
      <AiOutlineStar size={25} />
    </button>
  )
}

export default FavoriteButton
