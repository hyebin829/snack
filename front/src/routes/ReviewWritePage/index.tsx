import { addReview } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './write.module.scss'

const ReviewWritePage = () => {
  const params = useParams()
  const snackId = params.id
  const [review, setReview] = useState('')
  const { myInfo } = useAppSelector((state) => state.user)
  const [rating, setRating] = useState(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGetValue = (e: MouseEvent<HTMLInputElement>) => {
    setRating(Number(e.currentTarget.value))
  }

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (myInfo && rating && review.trim()) {
      dispatch(addReview({ content: review, snackId, userId: myInfo.id, rating }))
      navigate(`/snack/${snackId}`)
    } else {
      console.log('warning')
    }
  }

  const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value)
  }

  return (
    <div>
      <div className={styles.ratingGroup}>
        <input type='radio' defaultChecked value={0} className={styles.ratingInput} name='rating' />
        <label htmlFor='rating1' className={styles.ratingLabel}>
          <AiFillStar className={styles.starIcon} />
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
          <AiFillStar className={styles.starIcon} />
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
          <AiFillStar className={styles.starIcon} />
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
          <AiFillStar className={styles.starIcon} />
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
          <AiFillStar className={styles.starIcon} />
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
        />
        <button type='submit'>작성</button>
      </form>
    </div>
  )
}

export default ReviewWritePage
