import { loadReviews } from 'actions/post'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { IoPersonCircle } from 'react-icons/io5'
import styles from './reviewlist.module.scss'
import { openConfirmModal } from 'reducers/modal'
import LikeButton from 'components/LikeButton'
import { AiFillStar } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'

const ReviewListPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { reviewList, loadReviewsLoading, hasMoreReview } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

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
      {!reviewList.length && <div className={styles.noReview}>리뷰가 없습니다.</div>}

      <ul>
        {reviewList.map((review, index) => (
          <li key={`${review.id}-${review.UserId}-${index + 1}`} className={styles.reviewWrapper}>
            <ul className={styles.review}>
              <li className={styles.userProfile}>
                {review.User?.profileimagesrc ? (
                  <img
                    src={`http://localhost:3065/profileimage/${review.User?.profileimagesrc}`}
                    alt='profile'
                  />
                ) : (
                  <IoPersonCircle size={35} />
                )}
                {review.User?.nickname}
                <span className={styles.rating}>
                  <AiFillStar size={15} color='#ffa500' />
                  {review.rating}
                </span>
              </li>
              {myInfo?.id === review.UserId && (
                <button
                  type='button'
                  onClick={() => handleOpenModal(review.id)}
                  className={styles.deleteButton}
                >
                  <span>
                    <RiDeleteBin6Line size={15} color='#a8a8a8' />
                  </span>
                  삭제
                </button>
              )}
              <li className={styles.createdDate}>{dayjs(review.createdAt).format('YYYY-MM-DD')}</li>
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
      <div ref={target} />
    </div>
  )
}

export default ReviewListPage
