import FavoriteButton from 'components/FavoriteButton'
import { useAppSelector } from 'hooks/useRedux'
import { Link } from 'react-router-dom'
import styles from './myfavorite.module.scss'

const MyFavoritePage = () => {
  const { myInfo } = useAppSelector((state) => state.user)

  return (
    <div className={styles.myfavoriteWrapper}>
      <h2>좋아요 누른 과자</h2>
      <ul className={styles.favoriteListWrapper}>
        {myInfo?.Favorited.map((snack) => (
          <li className={styles.snackWrapper} key={snack.id}>
            <Link to={`/snack/${snack.id}`}>
              <ul>
                <li>
                  <img
                    src={`http://localhost:3065/snackimage/${snack.imagesrc}`}
                    alt={snack.name}
                  />
                </li>
                <li className={styles.snackName}>{snack.name}</li>
                <li className={styles.snackBrand}>{snack.brand}</li>
              </ul>
            </Link>
            <span className={styles.favoriteButton}>
              <FavoriteButton snackId={snack.id.toString()} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyFavoritePage
