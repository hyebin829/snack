import { loadMyReviews } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useRef } from 'react'
import styles from './myreview.module.scss'

import LikeButton from 'components/LikeButton'
import { openConfirmModal } from 'reducers/modal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import dayjs from 'dayjs'

const MyReviewPage = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const { myReviewList, hasMoreMyReview, loadMyReviewsLoading } = useAppSelector(
    (state) => state.post
  )

  const handleOpenModal = (reviewId: number) => {
    dispatch(openConfirmModal(reviewId))
  }

  const dispatch = useAppDispatch()
  const target = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const lastId = myReviewList[myReviewList.length - 1]?.id
        if (entry.isIntersecting && hasMoreMyReview && !loadMyReviewsLoading && myInfo) {
          dispatch(loadMyReviews({ lastId, userId: myInfo?.id }))
        }
      })
    }
    const observer = new IntersectionObserver(intersectionHandler, options)
    if (target.current) {
      observer.observe(target.current)
    }
    return () => observer && observer.disconnect()
  }, [dispatch, hasMoreMyReview, loadMyReviewsLoading, myInfo, myReviewList])

  return (
    <div className={styles.reviewPage}>
      <h2>내가 작성한 리뷰</h2>
      {!myReviewList.length && <div className={styles.noReview}>작성한 리뷰가 없습니다.</div>}
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
              <li className={styles.snackNameDate}>
                {review.Snack.name}
                <span>{dayjs(review.createdAt).format('YYYY-MM-DD')}</span>
              </li>
              <li className={styles.reviewContent}>{review.content}</li>
              <li className={styles.likers}>
                <LikeButton review={review} />
                {review.Likers.length}
              </li>
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
            </ul>
          </li>
        ))}
      </ul>
      <div ref={target} />
    </div>
  )
}

export default MyReviewPage
