import { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { loadReviews } from 'actions/post'
import { openConfirmModal } from 'reducers/modal'
import LikeButton from 'components/LikeButton'
import Spiner from 'components/Spiner'
import styles from './reviewlist.module.scss'
import { AiFillStar } from 'react-icons/ai'

const ReviewListPage = () => {
  const { reviewList, loadReviewsLoading, hasMoreReview } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()

  const handleOpenModal = (reviewId: number) => {
    dispatch(openConfirmModal(reviewId))
  }

  const target = useRef(null)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const lastId = reviewList[reviewList.length - 1]?.id
        if (entry.isIntersecting && hasMoreReview && !loadReviewsLoading) {
          dispatch(loadReviews({ lastId, snackId }))
        }
      })
    }
    const observer = new IntersectionObserver(intersectionHandler, options)
    if (target.current) {
      observer.observe(target.current)
    }
    return () => observer && observer.disconnect()
  }, [dispatch, hasMoreReview, loadReviewsLoading, reviewList, snackId])

  return (
    <div>
      {reviewList.length ? (
        <ul>
          {reviewList.map((review, index) => (
            <li key={`${review.id}-${review.UserId}-${index + 1}`} className={styles.reviewWrapper}>
              <ul className={styles.review}>
                <li className={styles.userProfile}>
                  <img
                    src={`http://localhost:3065/profileimage/${review.User?.profileimagesrc}`}
                    alt='profile'
                  />
                  {review.User?.nickname}
                  <span className={styles.rating}>
                    <AiFillStar size={15} color='#ffa800' />
                    {review.rating}
                  </span>
                </li>
                {myInfo?.id === review.UserId && (
                  <button
                    type='button'
                    onClick={() => handleOpenModal(review.id)}
                    className={styles.deleteButton}
                  >
                    삭제
                  </button>
                )}
                <li className={styles.createdDate}>
                  {dayjs(review.createdAt).format('YYYY-MM-DD')}
                </li>
                <li className={styles.reviewcontent}>{review.content}</li>
                <li className={styles.likers}>
                  <span>
                    <LikeButton review={review} />
                  </span>
                  {review.Likers.length}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        !loadReviewsLoading && <div className={styles.noReview}>리뷰가 없습니다.</div>
      )}
      {loadReviewsLoading && <Spiner />}
      <div ref={target} className={styles.target} />
    </div>
  )
}

export default ReviewListPage
