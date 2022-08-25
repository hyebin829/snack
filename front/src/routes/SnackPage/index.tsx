import { loadSnackInfo } from 'actions/post'
import FavoriteButton from 'components/FavoriteButton'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReviewListPage from 'routes/ReviewListPage'
import styles from './snack.module.scss'
import { AiFillStar } from 'react-icons/ai'

const SnackPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { snackInfo } = useAppSelector((state) => state.post)
  const { myInfo, addFavoriteLoading, removeFavoriteLoading } = useAppSelector(
    (state) => state.user
  )

  useEffect(() => {
    dispatch(loadSnackInfo({ id: snackId }))
  }, [dispatch, snackId, addFavoriteLoading, removeFavoriteLoading])

  const myReview = snackInfo?.Reviews.filter((x) => x.UserId === myInfo?.id)

  const ratingArr = snackInfo?.Reviews.map((item) => item.rating)
  let ratingAverage = 0
  if (ratingArr) {
    ratingAverage = Number(
      (ratingArr.reduce((sum, cur) => sum + cur, 0) / ratingArr.length).toFixed(2)
    )
  }

  return (
    <div>
      <FavoriteButton snackInfo={snackInfo} />
      <ul className={styles.snackInfoWrapper}>
        <img
          src={`http://localhost:3065/snackimage/${snackInfo?.imagesrc}`}
          alt={snackInfo?.name}
        />
        <li className={styles.snackName}>{snackInfo?.name}</li>
        <li>{snackInfo?.brand}</li>
        <li>{snackInfo?.country}</li>
        <li>
          평균 <AiFillStar size={14} /> {isNaN(ratingAverage) ? 0 : ratingAverage}
        </li>
      </ul>

      {myReview?.length ? (
        <div>{myReview[0].content}</div>
      ) : (
        <Link to={`/snack/${snackId}/review`}>리뷰 작성하기</Link>
      )}
      <ReviewListPage />
    </div>
  )
}

export default SnackPage
