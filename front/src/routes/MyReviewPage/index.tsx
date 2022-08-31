import { loadMyReviews } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useRef } from 'react'
import styles from './myreview.module.scss'

const MyReviewPage = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const { myReviewList, hasMoreMyReview, loadMyReviewsLoading } = useAppSelector(
    (state) => state.post
  )

  const dispatch = useAppDispatch()
  console.log(myReviewList)
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
    <div>
      <ul>
        {myReviewList.map((review, index) => (
          <li key={`${review.id}-${review.UserId}-${index + 1}`} className={styles.reviewWrapper}>
            <ul className={styles.review}>
              <li>
                <img
                  src={`http://localhost:3065/snackimage/${review.Snack.imagesrc}`}
                  alt={review.Snack.imagesrc}
                />
                <span>{review.Snack.name}</span>
                <span>{review.Snack.brand}</span>
              </li>
              <li>{review.content}</li>
            </ul>
          </li>
        ))}
      </ul>
      <div ref={target} />
    </div>
  )
}

export default MyReviewPage
