import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'hooks/useRedux'
import styles from './profile.module.scss'
import { IoPersonCircle } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import { FaGrinBeamSweat } from 'react-icons/fa'

const ProfilePage = () => {
  const { myInfo } = useAppSelector((state) => state.user)

  useEffect(() => {}, [myInfo])

  if (!myInfo)
    return (
      <div className={styles.needLoginMessage}>
        <span>
          <FaGrinBeamSweat size={100} color='#d7d9dc' />
        </span>
        <span>로그인이 필요합니다.</span>
      </div>
    )

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileWrapper}>
        {myInfo.profileimagesrc ? (
          <img
            src={`http://localhost:3065/profileimage/${myInfo.profileimagesrc}`}
            alt='my profile'
          />
        ) : (
          <IoPersonCircle size={130} />
        )}
        <div className={styles.nickname}>{myInfo?.nickname}</div>
        <Link to='/editprofile'>
          프로필 수정 <AiFillEdit size={16} />
        </Link>
      </div>
      <div className={styles.menuWrapper}>
        <ul>
          <li className={styles.myfavorite}>
            <Link to='/myfavorite'>좋아요 누른 과자</Link>
          </li>
          <li className={styles.myreview}>
            <Link to='/myreview'>내가 작성한 리뷰</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage
