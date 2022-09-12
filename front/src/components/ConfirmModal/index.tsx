import { removeReview } from 'actions/post'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import Portal from 'Portal'
import { closeConfirmModal } from 'reducers/modal'
import styles from './confirm.module.scss'

const ConfirmModal = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const { reviewId } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const deleteReview = () => {
    dispatch(removeReview({ reviewId, userId: myInfo?.id }))
    dispatch(closeConfirmModal())
  }

  const handleCloseModal = () => {
    dispatch(closeConfirmModal())
  }

  return (
    <Portal>
      <div className={styles.confirmWrapper}>
        <div>삭제하시겠습니까?</div>
        <button type='button' onClick={deleteReview}>
          예
        </button>
        <button type='button' onClick={handleCloseModal}>
          닫기
        </button>
      </div>
    </Portal>
  )
}

export default ConfirmModal
