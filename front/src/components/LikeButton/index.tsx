import { addLike, removeLike } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri'
import { openLoginModal } from 'reducers/modal'
import { IbestReview, Ireview } from 'types/post'

type review = {
  review: Ireview | IbestReview
}

const LikeButton = ({ review }: review) => {
  const dispatch = useAppDispatch()
  const { myInfo } = useAppSelector((state) => state.user)

  const toggleReviewLike = () => {
    if (!myInfo?.id) {
      dispatch(openLoginModal())
    } else {
      liked
        ? dispatch(removeLike({ reviewId: review.id }))
        : dispatch(addLike({ reviewId: review.id }))
    }
  }

  const liked = review.Likers.find((liker) => liker.id === myInfo?.id)

  return (
    <button type='button' onClick={toggleReviewLike}>
      {liked ? <RiThumbUpFill /> : <RiThumbUpLine />}
    </button>
  )
}

export default LikeButton
