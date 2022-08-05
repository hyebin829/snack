import { loadSnackInfo } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Ireview } from 'types/post'

const SnackPage = () => {
  const params = useParams()
  const snackId = params.id
  const dispatch = useAppDispatch()
  const { snackInfo } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)
  const [preview, setPreview] = useState<Ireview[]>([])

  useEffect(() => {
    dispatch(loadSnackInfo({ id: snackId }))
  }, [dispatch, snackId])

  useEffect(() => {
    if (snackInfo?.Reviews.length) {
      setPreview(snackInfo?.Reviews.slice(-2))
    }
  }, [snackInfo?.Reviews])

  const myReview = snackInfo?.Reviews.filter((x) => x.UserId === myInfo?.id)

  const ratingArr = snackInfo?.Reviews.map((item) => item.rating)
  let ratingAverage = 0
  if (ratingArr) {
    ratingAverage = Number(
      (ratingArr.reduce((sum, cur) => sum + cur, 0) / ratingArr.length).toFixed(2)
    )
  }

  return (
    <div>
      {myReview?.length ? (
        <div>{myReview[0].content}</div>
      ) : (
        <Link to={`/snack/${snackId}/review`}>리뷰 작성하기</Link>
      )}
      <ul>
        <li>{isNaN(ratingAverage) ? 0 : ratingAverage}</li>
        <li>{snackInfo?.name}</li>
        <li>{snackInfo?.brand}</li>
        <li>{snackInfo?.country}</li>
        <img
          src={`http://localhost:3065/snackimage/${snackInfo?.imagesrc}`}
          alt={snackInfo?.name}
        />
      </ul>

      <ul>
        {preview.map((review) => (
          <Fragment key={`${review.SnackId}-${review.UserId}`}>
            <li>{review.content}</li>
            <li>{review.User.nickname}</li>
          </Fragment>
        ))}
      </ul>
      <Link to={`/snack/${snackId}/reviewlist`}>더보기</Link>
    </div>
  )
}

export default SnackPage
