import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { Fragment, useEffect } from 'react'
import styles from './home.module.scss'
import { loadPopularSnack, loadTopRatingSnack } from 'actions/post'
import { loadMyInfo } from 'actions/user'

const Home = () => {
  const dispatch = useAppDispatch()
  const { popularSnackList, topRatingSnackList } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadPopularSnack())
    dispatch(loadTopRatingSnack())
    dispatch(loadMyInfo())
  }, [dispatch])

  console.log(myInfo)

  return (
    <div className={styles.homeWrapper}>
      <div>인기 과자</div>
      <ul>
        {popularSnackList.map((item) => (
          <Fragment key={item.id}>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.count}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Fragment>
        ))}
      </ul>
      <div>별점이 높은 과자</div>
      <ul>
        {topRatingSnackList.map((item) => (
          <Fragment key={item.id}>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.rating.toFixed(1)}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Fragment>
        ))}
      </ul>
      <div>리뷰가 많은 과자</div>
    </div>
  )
}

export default Home
