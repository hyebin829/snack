import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { loadBestReview } from 'actions/post'
import LikeButton from 'components/LikeButton'
import Spiner from 'components/Spiner'
import styles from './bestReview.module.scss'
import { AiFillStar } from 'react-icons/ai'

type snackid = {
  snackId: string | undefined
}

const BestReview = ({ snackId }: snackid) => {
  const dispatch = useAppDispatch()
  const {
    bestReviewList,
    addLikeLoading,
    removeLikeLoading,
    removeReviewLoading,
    loadBestReviewLoading,
  } = useAppSelector((state) => state.post)

  useEffect(() => {
    dispatch(loadBestReview({ id: snackId }))
  }, [dispatch, snackId, addLikeLoading, removeLikeLoading, removeReviewLoading])

  return (
    <div>
      {loadBestReviewLoading ? (
        <Spiner />
      ) : (
        <ul className={styles.bestReviewList}>
          {bestReviewList.map((review) => (
            <li key={review.id}>
              <ul className={styles.bestReview}>
                <li className={styles.profile}>
                  <span className={styles.best}>BEST</span>
                  <img
                    src={`http://localhost:3065/profileimage/${review.profileimagesrc}`}
                    alt='profile'
                  />
                  <span>{review.nickname}</span>
                  <span className={styles.rating}>
                    <AiFillStar size={15} color='#ffa800' />
                    {review.rating}
                  </span>
                </li>
                <li className={styles.content}>{review.content}</li>
                <li className={styles.date}>{dayjs(review.createdAt).format('YYYY-MM-DD')}</li>
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
      )}
    </div>
  )
}

export default BestReview
