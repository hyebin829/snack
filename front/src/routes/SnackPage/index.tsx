import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { loadSnackInfo } from 'actions/post'
import { openLoginModal, openReviewModal } from 'reducers/modal'
import ReviewListPage from 'routes/ReviewListPage'
import FavoriteButton from 'components/FavoriteButton'
import BestReview from 'components/BestReview'
import SnackSkeleton from 'components/Skeleton/SnackSkeleton'
import styles from './snack.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { HiPencilAlt } from 'react-icons/hi'

const SnackPage = () => {
  const { snackInfo, loadSnackInfoLoading } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  const params = useParams()
  const dispatch = useAppDispatch()
  const snackId = params.id
  const myReview = snackInfo?.Reviews.filter((review) => review.UserId === myInfo?.id)

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

  return (
    <div className={styles.snackPage}>
      {loadSnackInfoLoading ? (
        <SnackSkeleton />
      ) : (
        <ul className={styles.snackInfoWrapper}>
          <li>
            <FavoriteButton snackId={snackId} />
          </li>
          <li>
            <img
              src={`http://localhost:3065/snackimage/${snackInfo?.imagesrc}`}
              alt={snackInfo?.name}
            />
          </li>
          <li className={styles.snackName}>{snackInfo?.name}</li>
          <li className={styles.snackBrand}>{snackInfo?.brand}</li>
          <li className={styles.rating}>
            평균 <AiFillStar size={15} color='#ffa800' /> {isNaN(ratingAverage) ? 0 : ratingAverage}
            점<span>({snackInfo?.Reviews.length.toLocaleString()})</span>
          </li>
          {myReview?.length ? (
            <div />
          ) : (
            <li className={styles.reviewButtonWrapper}>
              <button type='button' onClick={handleOpenReviewModal}>
                <HiPencilAlt /> 리뷰 작성하기
              </button>
            </li>
          )}
        </ul>
      )}
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewTitle}>리뷰</div>
        <BestReview snackId={snackId} />
        <ReviewListPage />
      </div>
    </div>
  )
}

export default SnackPage
