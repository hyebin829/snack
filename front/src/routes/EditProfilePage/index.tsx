/* eslint-disable no-irregular-whitespace */
import { changeNickname, loadMyInfo } from 'actions/user'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './editprofile.module.scss'

const EditProfilePage = () => {
  const { myInfo, changeNicknameError, changeNicknameDone, changeNicknameLoading } = useAppSelector(
    (state) => state.user
  )
  const [nickname, setNickname] = useState(myInfo?.nickname)
  const [nicknameValueLengthError, setNicknameValueLengthError] = useState(false)
  const [checkBlank, setCheckBlank] = useState(false)
  const [viewMessage, setViewMessage] = useState(false)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadMyInfo)
  }, [changeNicknameLoading, dispatch])

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

  if (!myInfo) return <div className={styles.needLoginMessage}>로그인이 필요합니다.</div>

  return (
    <div>
      <form onSubmit={onSubmitNickname}>
        <input type='text' defaultValue={myInfo?.nickname} onChange={onChangeNickname} />
        {!checkBlank && !nicknameValueLengthError && <button type='submit'>확인</button>}
      </form>
      {changeNicknameError && viewMessage && <div>이미 사용중인 닉네임입니다.</div>}
      {changeNicknameDone && viewMessage && <div>변경되었습니다</div>}
      {nicknameValueLengthError && <div>3글자 이상 10글자 이하로 작성해주세요.</div>}
      {checkBlank && <div>공백문자는 입력 불가능합니다.</div>}
    </div>
  )
}

export default EditProfilePage
