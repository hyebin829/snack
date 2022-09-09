import { loadReviews, removeReview } from 'actions/post'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { IoPersonCircle } from 'react-icons/io5'
import styles from './reviewlist.module.scss'

const ReviewListPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { reviewList, loadReviewsLoading, hasMoreReview } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  const deleteReview = (reviewId: number) => {
    dispatch(removeReview({ reviewId, userId: myInfo?.id }))
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
      {!reviewList.length && <div>리뷰가 없습니다.</div>}
      <ul>
        {reviewList.map((review, index) => (
          <li key={`${review.id}-${review.UserId}-${index + 1}`} className={styles.reviewWrapper}>
            <ul>
              <li>{review.UserId}</li>
              <li>{review.User?.nickname}</li>
              {review.User?.profileimagesrc ? (
                <li>
                  <img
                    src={`http://localhost:3065/profileimage/${review.User?.profileimagesrc}`}
                    alt='profile'
                  />
                </li>
              ) : (
                <IoPersonCircle size={35} />
              )}
              <li className={styles.createdDate}>{dayjs(review.createdAt).format('YYYY-MM-DD')}</li>
              <li className={styles.reviewcontent}>{review.content}</li>
              <li className={styles.reviewRating}>{review.rating}</li>
            </ul>
            {myInfo?.id === review.UserId && (
              <button type='button' onClick={() => deleteReview(review.id)}>
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
      <div ref={target} />
    </div>
  )
}

export default ReviewListPage
