import { loadSnackInfo, removeReview } from 'actions/post'
import FavoriteButton from 'components/FavoriteButton'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReviewListPage from 'routes/ReviewListPage'
import styles from './snack.module.scss'
import { AiFillStar } from 'react-icons/ai'

import dayjs from 'dayjs'

const SnackPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { snackInfo, removeReviewLoading } = useAppSelector((state) => state.post)
  const { myInfo, addFavoriteLoading, removeFavoriteLoading } = useAppSelector(
    (state) => state.user
  )

  useEffect(() => {
    dispatch(loadSnackInfo({ id: snackId }))
  }, [dispatch, snackId, addFavoriteLoading, removeFavoriteLoading, removeReviewLoading])

  const ratingArr = snackInfo?.Reviews.map((item) => item.rating)
  let ratingAverage = 0
  if (ratingArr) {
    ratingAverage = Number(
      (ratingArr.reduce((sum, cur) => sum + cur, 0) / ratingArr.length).toFixed(2)
    )
  }

  console.log(snackInfo)

  return (
    <div>
      <FavoriteButton snackInfo={snackInfo} />
      <ul className={styles.snackInfoWrapper}>
        <img
          src={`http://localhost:3065/snackimage/${snackInfo?.imagesrc}`}
          alt={snackInfo?.name}
        />
        <li className={styles.snackName}>{snackInfo?.name}</li>
        <li className={styles.snackBrand}>{snackInfo?.brand}</li>
        <li className={styles.rating}>
          평균 <AiFillStar size={14} /> {isNaN(ratingAverage) ? 0 : ratingAverage}점
        </li>
      </ul>

      {myInfo ? (
        <Link to={`/snack/${snackId}/review`}>리뷰 작성하기</Link>
      ) : (
        <div>리뷰 작성을 위해 로그인이 필요합니다.</div>
      )}
      <ReviewListPage />
    </div>
  )
}

export default SnackPage
