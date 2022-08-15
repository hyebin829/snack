import { useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'

const ProfilePage = () => {
  const { myInfo } = useAppSelector((state) => state.user)

  useEffect(() => {}, [myInfo])
  return (
    <div>
      <div>{myInfo?.nickname}</div>
    </div>
  )
}

export default ProfilePage
