import { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { loadMyReviews } from 'actions/post'
import { openConfirmModal } from 'reducers/modal'
import LikeButton from 'components/LikeButton'
import styles from './myreview.module.scss'
import { AiFillStar } from 'react-icons/ai'

const MyReviewPage = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const { myReviewList } = useAppSelector((state) => state.post)

  const dispatch = useAppDispatch()
  const target = useRef(null)

  useEffect(() => {
    dispatch(loadMyReviews({ userId: myInfo?.id }))
  }, [dispatch, myInfo?.id])

  const handleOpenModal = (reviewId: number) => {
    dispatch(openConfirmModal(reviewId))
  }

  if (!myInfo) return <div className={styles.needLogin}>로그인이 필요합니다.</div>

  return (
    <div className={styles.reviewPage}>
      <h2>내가 작성한 리뷰</h2>
      {myReviewList.length ? (
        <ul>
          {myReviewList?.map((review, index) => (
            <li key={`${review.id}-${review.UserId}-${index + 1}`} className={styles.reviewWrapper}>
              <ul className={styles.review}>
                <li className={styles.snackImgWrapper}>
                  <img
                    src={`http://localhost:3065/snackimage/${review.Snack.imagesrc}`}
                    alt={review.Snack.imagesrc}
                  />
                </li>
                <li className={styles.nameRating}>
                  <span className={styles.name}>{review.Snack.name}</span>
                  <span className={styles.rating}>
                    <AiFillStar size={15} color='#ffa800' />
                    {review.rating}
                  </span>
                </li>
                <li className={styles.reviewContent}>{review.content}</li>
                <li className={styles.date}>{dayjs(review.createdAt).format('YYYY-MM-DD')}</li>
                <li className={styles.likers}>
                  <span>
                    <LikeButton review={review} />
                  </span>
                  {review.Likers.length}
                </li>
                <li className={styles.deleteButton}>
                  <button type='button' onClick={() => handleOpenModal(review.id)}>
                    삭제
                  </button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noReview}>작성한 리뷰가 없습니다.</div>
      )}
      <div ref={target} />
    </div>
  )
}

export default MyReviewPage
