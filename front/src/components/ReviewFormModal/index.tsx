import { addReview } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { closeReviewModal } from 'reducers/modal'
import styles from './reviewForm.module.scss'
import { IoMdClose } from 'react-icons/io'
import Portal from 'Portal'

const ReviewFormModal = () => {
  const params = useParams()
  const snackId = params.id
  const [review, setReview] = useState('')
  const { myInfo } = useAppSelector((state) => state.user)
  const { snackInfo } = useAppSelector((state) => state.post)
  const [rating, setRating] = useState(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (myInfo?.Reviews.length) {
  //     navigate(`/snack/${snackId}`)
  //   }
  // }, [myInfo?.Reviews, navigate, snackId])

  if (!myInfo) return <div>로그인이 필요합니다.</div>
  console.log(myInfo)

  const handleGetValue = (e: MouseEvent<HTMLInputElement>) => {
    setRating(Number(e.currentTarget.value))
  }

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (myInfo && rating && review.trim()) {
      dispatch(
        addReview({
          content: review,
          snackId,
          userId: myInfo.id,
          nickname: myInfo.nickname,
          profileimagesrc: myInfo.profileimagesrc,
          rating,
        })
      )
      dispatch(closeReviewModal())
    }
  }

  const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value)
  }

  const handleCloseModal = () => {
    dispatch(closeReviewModal())
  }

  return (
    <Portal>
      <div className={styles.reviewFormWrapper}>
        <button className={styles.closeButton} type='button' onClick={handleCloseModal}>
          <IoMdClose size={25} />
        </button>
        <h2>{snackInfo?.name}의 리뷰를 작성해주세요.</h2>
        <div className={styles.ratingGroup}>
          <input
            type='radio'
            defaultChecked
            value={0}
            className={styles.ratingInput}
            name='rating'
          />
          <label htmlFor='rating1' className={styles.ratingLabel}>
            <AiFillStar className={styles.starIcon} size={30} />
          </label>
          <input
            type='radio'
            value={1}
            className={styles.ratingInput}
            id='rating1'
            name='rating'
            onClick={handleGetValue}
          />
          <label htmlFor='rating2' className={styles.ratingLabel}>
            <AiFillStar className={styles.starIcon} size={30} />
          </label>
          <input
            type='radio'
            value={2}
            className={styles.ratingInput}
            id='rating2'
            name='rating'
            onClick={handleGetValue}
          />
          <label htmlFor='rating3' className={styles.ratingLabel}>
            <AiFillStar className={styles.starIcon} size={30} />
          </label>
          <input
            type='radio'
            value={3}
            className={styles.ratingInput}
            id='rating3'
            name='rating'
            onClick={handleGetValue}
          />
          <label htmlFor='rating4' className={styles.ratingLabel}>
            <AiFillStar className={styles.starIcon} size={30} />
          </label>
          <input
            type='radio'
            value={4}
            className={styles.ratingInput}
            id='rating4'
            name='rating'
            onClick={handleGetValue}
          />
          <label htmlFor='rating5' className={styles.ratingLabel}>
            <AiFillStar className={styles.starIcon} size={30} />
          </label>
          <input
            type='radio'
            value={5}
            className={styles.ratingInput}
            id='rating5'
            name='rating'
            onClick={handleGetValue}
          />
        </div>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            name='review'
            id='review'
            cols={30}
            rows={10}
            onChange={onChangeReview}
            value={review}
            maxLength={200}
            placeholder='과자 리뷰를 작성해주세요'
          />
          <button type='submit' disabled={!review || !rating}>
            등록
          </button>
        </form>
      </div>
    </Portal>
  )
}

export default ReviewFormModal
