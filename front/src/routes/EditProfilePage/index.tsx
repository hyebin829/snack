/* eslint-disable no-irregular-whitespace */
import { changeNickname, loadMyInfo, editProfileimage, uploadImage } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './editprofile.module.scss'
import { IoPersonCircle } from 'react-icons/io5'

const EditProfilePage = () => {
  const {
    myInfo,
    loadMyInfoDone,
    changeNicknameError,
    changeNicknameDone,
    changeNicknameLoading,
    editProfileImageDone,
    uploadImageDone,
    profileImagePath,
    uploadImageError,
  } = useAppSelector((state) => state.user)
  const [nickname, setNickname] = useState(myInfo?.nickname)
  const [nicknameValueLengthError, setNicknameValueLengthError] = useState(false)
  const [checkBlank, setCheckBlank] = useState(false)
  const [viewMessage, setViewMessage] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMyInfo)
  }, [changeNicknameLoading, editProfileImageDone, dispatch])

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setViewMessage(false)
    setNickname(e.target.value)
    const regExp = /[ 　]/gi
    regExp.test(e.target.value) ? setCheckBlank(true) : setCheckBlank(false)
    e.target.value.length < 3 || e.target.value.length > 10
      ? setNicknameValueLengthError(true)
      : setNicknameValueLengthError(false)
  }

  const onSubmitNickname = (e: FormEvent<HTMLFormElement>) => {
    if (!nickname || !nickname.trim()) {
      e.preventDefault()
    } else {
      e.preventDefault()
      dispatch(changeNickname({ nickname: nickname.trim() }))
      setViewMessage(true)
    }
  }

  const onChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const imageFormData = new FormData()

    ;[].forEach.call(e.target.files, (f) => {
      imageFormData.append('profileimage', f)
    })
    dispatch(uploadImage(imageFormData))
  }

  const onSubmitProfileImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(editProfileimage({ imagesrc: profileImagePath }))
    setViewMessage(true)
  }

  if (loadMyInfoDone && !myInfo)
    return <div className={styles.needLoginMessage}>로그인이 필요합니다.</div>

  return (
    <div>
      <div className={styles.profileimageWrapper}>
        {myInfo?.profileimagesrc ? (
          <img
            src={`http://localhost:3065/profileimage/${myInfo.profileimagesrc}`}
            alt='my profile'
          />
        ) : (
          <IoPersonCircle />
        )}
        <form
          onSubmit={onSubmitProfileImage}
          encType='multipart/form-data'
          className={styles.editProfileimageForm}
        >
          <label htmlFor='file'>파일 선택</label>
          <input
            type='file'
            id='file'
            accept='image/*'
            onChange={onChangeProfileImage}
            formEncType='multipart/form-data'
            name='profileimage'
          />
          {uploadImageDone ? (
            <button type='submit'>변경하기</button>
          ) : (
            <button type='button' disabled>
              변경하기
            </button>
          )}
        </form>
      </div>
      {uploadImageError && <div>{uploadImageError}</div>}
      <form onSubmit={onSubmitNickname}>
        <input type='text' defaultValue={myInfo?.nickname} onChange={onChangeNickname} />
        {!checkBlank && !nicknameValueLengthError && <button type='submit'>확인</button>}
      </form>
      {changeNicknameError && viewMessage && <div>이미 사용중인 닉네임입니다.</div>}
      {changeNicknameDone && viewMessage && <div>변경되었습니다</div>}
      {editProfileImageDone && viewMessage && <div>변경되었습니다</div>}
      {nicknameValueLengthError && <div>3글자 이상 10글자 이하로 작성해주세요.</div>}
      {checkBlank && <div>공백문자는 입력 불가능합니다.</div>}
    </div>
  )
}

export default EditProfilePage
