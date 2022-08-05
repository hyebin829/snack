import { loadReviews } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { Fragment, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Ireview } from 'types/post'
import styles from './reviewlist.module.scss'

const ReviewListPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { snackInfo, reviewList, hasMoreReview, loadReviewsLoading } = useAppSelector(
    (state) => state.post
  )

  const target = useRef(null)
  console.log(reviewList)

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

  console.log(snackId)

  return (
    <div>
      <ul>
        {reviewList.map((review) => (
          <Fragment key={`${review.id}-${review.UserId}`}>
            <li className={styles.reviewcontent}>{review.content}</li>
            <li>{review.UserId}</li>
          </Fragment>
        ))}
      </ul>
      <div ref={target}>adfadsf</div>
    </div>
  )
}

export default ReviewListPage