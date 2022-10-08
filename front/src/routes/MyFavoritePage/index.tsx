import { Link } from 'react-router-dom'
import { useAppSelector } from 'hooks/useRedux'
import FavoriteButton from 'components/FavoriteButton'
import styles from './myfavorite.module.scss'

const MyFavoritePage = () => {
  const { myInfo } = useAppSelector((state) => state.user)

  return (
    <div className={styles.myfavoriteWrapper}>
      <h2>좋아요 누른 과자</h2>
      {!myInfo?.Favorited.length ? (
        <div className={styles.emptyList}>
          좋아하는 과자가 없으신가요? <br />
          좋아하는 과자를 검색해 목록에 추가해보세요!
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default MyFavoritePage
