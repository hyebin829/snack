import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { addLike, removeLike } from 'actions/post'
import { openLoginModal } from 'reducers/modal'
import { IbestReview, Ireview } from 'types/post'
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri'

type review = {
  review: Ireview | IbestReview
}

const LikeButton = ({ review }: review) => {
  const { myInfo } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const liked = review.Likers.find((liker) => liker.id === myInfo?.id)

  const toggleReviewLike = () => {
    if (!myInfo?.id) {
      dispatch(openLoginModal())
    } else {
      liked
        ? dispatch(removeLike({ reviewId: review.id }))
        : dispatch(addLike({ reviewId: review.id }))
    }
  }

  return (
    <button type='button' onClick={toggleReviewLike} aria-label='like toggle'>
      {liked ? <RiThumbUpFill color='#ff7134' /> : <RiThumbUpLine color='#ff7134' />}
    </button>
  )
}

export default LikeButton
