/* eslint-disable jsx-a11y/no-static-element-interactions */
import { MouseEvent, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import Portal from 'Portal'
import { removeReview } from 'actions/post'
import { closeConfirmModal } from 'reducers/modal'
import styles from './confirm.module.scss'

const ConfirmModal = () => {
  const { myInfo } = useAppSelector((state) => state.user)
  const { reviewId } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null)

  const onClickBackground = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      dispatch(closeConfirmModal())
    }
  }

  const deleteReview = () => {
    dispatch(removeReview({ reviewId, userId: myInfo?.id }))
    dispatch(closeConfirmModal())
  }

  const handleCloseModal = () => {
    dispatch(closeConfirmModal())
  }

  return (
    <Portal>
      <div className={styles.modalBackground} ref={modalRef} onClick={onClickBackground}>
        <div className={styles.confirmWrapper}>
          <div className={styles.notice}>알림</div>
          <div className={styles.content}>리뷰를 삭제하시겠습니까?</div>
          <div className={styles.buttonWrapper}>
            <button type='button' onClick={deleteReview}>
              예
            </button>
            <button type='button' onClick={handleCloseModal}>
              아니오
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default ConfirmModal
