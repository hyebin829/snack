import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import styles from './home.module.scss'
import { loadPopularSnack, loadTopRatingSnack, loadTopReviewSnack } from 'actions/post'
import { loadMyInfo } from 'actions/user'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useAppDispatch()
  const { popularSnackList, topRatingSnackList, topReviewSnackList } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadPopularSnack())
    dispatch(loadTopRatingSnack())
    dispatch(loadTopReviewSnack())
    dispatch(loadMyInfo())
  }, [dispatch])

  return (
    <div className={styles.homeWrapper}>
      <div>인기 과자</div>
      <ul>
        {popularSnackList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id}>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.count}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Link>
        ))}
      </ul>
      <div>별점이 높은 과자</div>
      <ul>
        {topRatingSnackList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id}>
            <li>{item.rating.toFixed(1)}</li>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Link>
        ))}
      </ul>
      <div>리뷰가 많은 과자</div>
      <ul>
        {topReviewSnackList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id}>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.count}</li>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Home
