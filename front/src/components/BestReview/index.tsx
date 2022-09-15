import { loadBestReview } from 'actions/post'
import LikeButton from 'components/LikeButton'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, Fragment } from 'react'

type snackid = {
  snackId: string | undefined
}

const BestReview = ({ snackId }: snackid) => {
  const dispatch = useAppDispatch()
  const { bestReviewList, addLikeLoading, removeLikeLoading, removeReviewLoading } = useAppSelector(
    (state) => state.post
  )

  useEffect(() => {
    dispatch(loadBestReview({ id: snackId }))
  }, [dispatch, snackId, addLikeLoading, removeLikeLoading, removeReviewLoading])

  return (
    <div>
      <ul>
        {bestReviewList.map((review) => (
          <Fragment key={review.id}>
            <li>{review.content}</li>
            <li>{review.Likers.length}</li>
            <LikeButton review={review} />
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default BestReview
