import { loadSnackInfo } from 'actions/post'
import FavoriteButton from 'components/FavoriteButton'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewListPage from 'routes/ReviewListPage'
import styles from './snack.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { openReviewModal } from 'reducers/modal'
import BestReview from 'components/BestReview'

const SnackPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { snackInfo } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadSnackInfo({ id: snackId }))
  }, [dispatch, snackId])

  const ratingArr = snackInfo?.Reviews.map((item) => item.rating)
  let ratingAverage = 0
  if (ratingArr) {
    ratingAverage = Number(
      (ratingArr.reduce((sum, cur) => sum + cur, 0) / ratingArr.length).toFixed(2)
    )
  }

  const handleOpenReviewModal = () => {
    dispatch(openReviewModal())
  }

  return (
    <div>
      <FavoriteButton snackId={snackId} />
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
        <button type='button' onClick={handleOpenReviewModal}>
          리뷰 작성하기
        </button>
      ) : (
        <div>리뷰 작성을 위해 로그인이 필요합니다.</div>
      )}
      <BestReview snackId={snackId} />
      -----
      <ReviewListPage />
    </div>
  )
}

export default SnackPage
