import { loadMyReviews, removeReview } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useRef } from 'react'
import styles from './myreview.module.scss'

import { FaCookieBite } from 'react-icons/fa'
import LikeButton from 'components/LikeButton'

const MyReviewPage = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const { myReviewList, hasMoreMyReview, loadMyReviewsLoading } = useAppSelector(
    (state) => state.post
  )

  const deleteReview = (reviewId: number) => {
    dispatch(removeReview({ reviewId, userId: myInfo?.id }))
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
              <li>
                <span className={styles.snackName}>
                  <FaCookieBite color='#d2b48c	' />
                  {review.Snack.name}
                </span>
                {review.content}
              </li>
            </ul>
            <LikeButton review={review} />
            <button type='button' onClick={() => deleteReview(review.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div ref={target} />
    </div>
  )
}

export default MyReviewPage
