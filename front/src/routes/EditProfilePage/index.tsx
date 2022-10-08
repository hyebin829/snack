/* eslint-disable no-irregular-whitespace */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { changeNickname, loadMyInfo, editProfileimage, uploadImage } from 'actions/user'
import styles from './editprofile.module.scss'
import { IoCamera } from 'react-icons/io5'

const EditProfilePage = () => {
  const {
    myInfo,
    profileImagePath,
    changeNicknameError,
    changeNicknameLoading,
    uploadImageError,
    editProfileImageDone,
  } = useAppSelector((state) => state.user)

  const [nickname, setNickname] = useState(myInfo?.nickname)
  const [nicknameValueLengthError, setNicknameValueLengthError] = useState(false)
  const [checkBlank, setCheckBlank] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMyInfo)
    if (!myInfo) navigate('/')
  }, [changeNicknameLoading, editProfileImageDone, dispatch, myInfo, navigate])

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
      navigate('/profile')
    } else {
      dispatch(changeNickname({ nickname: nickname.trim() }))
      navigate('/profile')
    }

    if (profileImagePath.length) {
      dispatch(editProfileimage({ imagesrc: profileImagePath }))
      navigate('/profile')
    }
  }

  return (
    <div className={styles.profilePage}>
      <h2>프로필 편집</h2>
      <span>
        * 프로필 사진은 20mb이하 <br />* 닉네임은 3글자 이상 10글자 이하만 가능합니다.
      </span>
      <div className={styles.profileimageFormWrapper}>
        {profileImagePath.length ? (
          <img src={`http://localhost:3065/profileimage/${profileImagePath}`} alt='my profile' />
        ) : (
          <img
            src={`http://localhost:3065/profileimage/${myInfo?.profileimagesrc}`}
            alt='my profile'
          />
        )}
        <form
          encType='multipart/form-data'
          className={styles.editProfileForm}
          onSubmit={onSubmitProfile}
        >
          <div className={styles.inputWrapper}>
            <label htmlFor='file'>
              <IoCamera size={20} />
            </label>
            <input
              type='file'
              id='file'
              accept='image/*'
              onChange={onChangeProfileImage}
              formEncType='multipart/form-data'
              name='profileimage'
            />
          </div>

          <div className={styles.nicknameForm}>
            <input
              type='text'
              defaultValue={myInfo?.nickname}
              onChange={onChangeNickname}
              className={styles.nicknameInput}
            />
            <button type='submit' disabled={checkBlank || nicknameValueLengthError}>
              저장
            </button>
          </div>
        </form>
        <div className={styles.message}>
          {changeNicknameError && <div>이미 사용중인 닉네임입니다.</div>}
          {nicknameValueLengthError && <div>3글자 이상 10글자 이하로 작성해주세요.</div>}
          {checkBlank && <div>공백문자는 입력 불가능합니다.</div>}
        </div>
        {uploadImageError && <div className={styles.uploadError}>{uploadImageError}</div>}
      </div>
    </div>
  )
}

export default EditProfilePage
