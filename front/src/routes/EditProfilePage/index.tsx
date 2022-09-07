/* eslint-disable no-irregular-whitespace */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { changeNickname, loadMyInfo, editProfileimage, uploadImage } from 'actions/user'
import { IoPersonCircle, IoCamera } from 'react-icons/io5'
import styles from './editprofile.module.scss'

const EditProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    myInfo,
    loadMyInfoDone,
    profileImagePath,
    changeNicknameError,
    changeNicknameLoading,
    uploadImageDone,
    uploadImageError,
    editProfileImageDone,
  } = useAppSelector((state) => state.user)

  const [nickname, setNickname] = useState(myInfo?.nickname)
  const [nicknameValueLengthError, setNicknameValueLengthError] = useState(false)
  const [checkBlank, setCheckBlank] = useState(false)

  useEffect(() => {
    dispatch(loadMyInfo)
  }, [changeNicknameLoading, editProfileImageDone, dispatch])

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    const regExp = /[ 　]/gi
    regExp.test(e.target.value) ? setCheckBlank(true) : setCheckBlank(false)
    e.target.value.length < 3 || e.target.value.length > 10
      ? setNicknameValueLengthError(true)
      : setNicknameValueLengthError(false)
  }

  const onChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFormData = new FormData()

    if (!e.target.files?.length) return
    ;[].forEach.call(e.target.files, (f) => {
      imageFormData.append('profileimage', f)
    })
    dispatch(uploadImage(imageFormData))
  }

  const onSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nickname || !nickname.trim() || nickname === myInfo?.nickname) {
      e.preventDefault()
    } else {
      dispatch(changeNickname({ nickname: nickname.trim() }))
      navigate('/profile')
    }

    if (profileImagePath.length) {
      dispatch(editProfileimage({ imagesrc: profileImagePath }))
      navigate('/profile')
    }
  }

  if (loadMyInfoDone && !myInfo)
    return <div className={styles.needLoginMessage}>로그인이 필요합니다.</div>

  return (
    <div>
      <div className={styles.profileimageFormWrapper}>
        {profileImagePath.length ? (
          <img src={`http://localhost:3065/profileimage/${profileImagePath}`} alt='my profile' />
        ) : (
          (
            <img
              src={`http://localhost:3065/profileimage/${myInfo?.profileimagesrc}`}
              alt='my profile'
            />
          ) || <IoPersonCircle size={150} />
        )}
        <form
          encType='multipart/form-data'
          className={styles.editProfileForm}
          onSubmit={onSubmitProfile}
        >
          <label htmlFor='file'>
            <IoCamera size={22} />
          </label>
          <input
            type='file'
            id='file'
            accept='image/*'
            onChange={onChangeProfileImage}
            formEncType='multipart/form-data'
            name='profileimage'
          />

          {uploadImageError && <div>{uploadImageError}</div>}

          <input type='text' defaultValue={myInfo?.nickname} onChange={onChangeNickname} />
          {!uploadImageDone ||
          checkBlank ||
          nicknameValueLengthError ||
          nickname === myInfo?.nickname ? (
            <button type='button' disabled>
              저장
            </button>
          ) : (
            <button type='submit'>저장</button>
          )}
        </form>
        {changeNicknameError && <div>이미 사용중인 닉네임입니다.</div>}
        {nicknameValueLengthError && <div>3글자 이상 10글자 이하로 작성해주세요.</div>}
        {checkBlank && <div>공백문자는 입력 불가능합니다.</div>}
      </div>
    </div>
  )
}

export default EditProfilePage
