import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import { loadPopularSnack, loadTopRatingSnack, loadTopReviewSnack } from 'actions/post'
import { loadMyInfo } from 'actions/user'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { IoMdHeart } from 'react-icons/io'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import './style.scss'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import styles from './home.module.scss'

const Home = () => {
  const dispatch = useAppDispatch()
  const { popularSnackList, topRatingSnackList, topReviewSnackList } = useAppSelector(
    (state) => state.post
  )

  useEffect(() => {
    dispatch(loadPopularSnack())
    dispatch(loadTopRatingSnack())
    dispatch(loadTopReviewSnack())
    dispatch(loadMyInfo())
  }, [dispatch])

  return (
    <div className={styles.homeWrapper}>
      <h2>인기 과자</h2>
      <Swiper slidesPerView={3} navigation modules={[Navigation]}>
        {popularSnackList.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/snack/${item.id}`} key={item.id}>
              <span className={styles.infoWrapper}>
                <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
                <li>{item.name}</li>
                <li>{item.brand}</li>
                <li className={styles.heartCount}>
                  <IoMdHeart size={14} color='pink' /> {item.count}
                </li>
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <h2>별점이 높은 과자</h2>
      <Swiper slidesPerView={3} navigation modules={[Navigation]}>
        {topRatingSnackList.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/snack/${item.id}`} key={item.id}>
              <span className={styles.infoWrapper}>
                <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
                <li>{item.name}</li>
                <li>{item.brand}</li>
                <li>
                  <AiFillStar size={12} color='orange' />
                  {item.rating.toFixed(1)}
                </li>
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <h2>리뷰가 많은 과자</h2>
      <Swiper slidesPerView={3} navigation modules={[Navigation]}>
        {topReviewSnackList.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/snack/${item.id}`} key={item.id}>
              <span className={styles.infoWrapper}>
                <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
                <li>{item.name}</li>
                <li>{item.brand}</li>
                <li>{item.count} 리뷰</li>
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Home
