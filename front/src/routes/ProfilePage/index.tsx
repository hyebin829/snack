import { useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './profile.module.scss'
import { IoPersonCircle } from 'react-icons/io5'

const ProfilePage = () => {
  const { myInfo } = useAppSelector((state) => state.user)

  useEffect(() => {}, [myInfo])

  if (!myInfo) return <div className={styles.needLoginMessage}>로그인이 필요합니다.</div>

  return (
    <div>
      <div>
        <div>{myInfo?.nickname}</div>
        {myInfo.profileimagesrc ? (
          <img
            src={`http://localhost:3065/profileimage/${myInfo.profileimagesrc}`}
            alt='my profile'
          />
        ) : (
          <IoPersonCircle />
        )}
        <Link to='/editprofile'>수정</Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/myfavorite'>좋아요 누른 과자</Link>
          </li>
          <li>
            <Link to='/myreview'>내가 작성한 리뷰</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage
