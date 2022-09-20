import { loadSnackInfo } from 'actions/post'
import FavoriteButton from 'components/FavoriteButton'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewListPage from 'routes/ReviewListPage'
import styles from './snack.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { openConfirmModal, openLoginModal, openReviewModal } from 'reducers/modal'
import BestReview from 'components/BestReview'
import { HiPencilAlt } from 'react-icons/hi'

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
    if (!myInfo?.id) {
      dispatch(openLoginModal())
    } else {
      dispatch(openReviewModal())
    }
  }
  const myReview = snackInfo?.Reviews.filter((review) => review.UserId === myInfo?.id)

  return (
    <div className={styles.snackPage}>
      <ul className={styles.snackInfoWrapper}>
        <FavoriteButton snackId={snackId} />
        <img
          src={`http://localhost:3065/snackimage/${snackInfo?.imagesrc}`}
          alt={snackInfo?.name}
        />
        <li className={styles.snackName}>{snackInfo?.name}</li>
        <li className={styles.snackBrand}>{snackInfo?.brand}</li>
        <li className={styles.rating}>
          평균 <AiFillStar size={15} color='#ffa500' /> {isNaN(ratingAverage) ? 0 : ratingAverage}점
          <span>({snackInfo?.Reviews.length.toLocaleString()}명)</span>
        </li>
      </ul>
      <div className={styles.reviewWrapper}>
        {myReview?.length ? (
          <div />
        ) : (
          <>
            <div className={styles.writeReview}>{snackInfo?.name}의 리뷰를 남겨주세요! </div>
            <button type='button' onClick={handleOpenReviewModal}>
              <HiPencilAlt /> 리뷰 작성하기
            </button>
          </>
        )}
        <div className={styles.reviewTitle}>리뷰</div>
        <BestReview snackId={snackId} />
        <ReviewListPage />
      </div>
    </div>
  )
}

export default SnackPage
