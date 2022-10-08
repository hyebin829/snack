import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  loadMyReviews,
  loadPopularSnack,
  loadTopRatingSnack,
  loadTopReviewSnack,
} from 'actions/post'
import { loadMyInfo } from 'actions/user'
import HomeSkeleton from 'components/Skeleton/HomeSkeleton'
import styles from './home.module.scss'
import 'swiper/scss'
import './style.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import { AiFillStar } from 'react-icons/ai'
import { IoMdHeart } from 'react-icons/io'

const Home = () => {
  const {
    popularSnackList,
    loadPopularSnackLoading,
    loadTopRatingSnackLoading,
    loadTopReviewSnackLoading,
    topRatingSnackList,
    topReviewSnackList,
  } = useAppSelector((state) => state.post)
  const { myInfo } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPopularSnack())
    dispatch(loadTopRatingSnack())
    dispatch(loadTopReviewSnack())
    dispatch(loadMyInfo())
    if (myInfo?.id) {
      dispatch(loadMyReviews({ userId: myInfo?.id }))
    }
  }, [dispatch, myInfo?.id])

  return (
    <div className={styles.homeWrapper}>
      <h2>인기 과자</h2>
      <Swiper
        breakpoints={{ 600: { slidesPerView: 3 } }}
        slidesPerView={3.2}
        navigation
        modules={[Navigation]}
      >
        {popularSnackList.length ? (
          popularSnackList.map((item) => (
            <SwiperSlide key={item.id}>
              {loadPopularSnackLoading ? (
                <HomeSkeleton />
              ) : (
                <Link to={`/snack/${item.id}`} key={item.id}>
                  <ul className={styles.infoWrapper}>
                    <li>
                      <img
                        src={`http://localhost:3065/snackimage/${item.imagesrc}`}
                        alt={item.name}
                        width='120'
                        height='120'
                      />
                    </li>
                    <li>{item.name}</li>
                    <li>{item.brand}</li>
                    <li className={styles.heartCount}>
                      <IoMdHeart size={13} color='#ff7134' /> {item.count}
                    </li>
                  </ul>
                </Link>
              )}
            </SwiperSlide>
          ))
        ) : (
          <div>과자 목록이 없습니다.</div>
        )}
      </Swiper>
      <h2>별점이 높은 과자</h2>
      <Swiper
        slidesPerView={3.2}
        breakpoints={{ 600: { slidesPerView: 3 } }}
        navigation
        modules={[Navigation]}
      >
        {topRatingSnackList.length ? (
          topRatingSnackList.map((item) => (
            <SwiperSlide key={item.id}>
              {loadTopRatingSnackLoading ? (
                <HomeSkeleton />
              ) : (
                <Link to={`/snack/${item.id}`} key={item.id}>
                  <ul className={styles.infoWrapper}>
                    <li>
                      <img
                        src={`http://localhost:3065/snackimage/${item.imagesrc}`}
                        alt={item.name}
                        width='120'
                        height='120'
                      />
                    </li>
                    <li>{item.name}</li>
                    <li>{item.brand}</li>
                    <li>
                      <AiFillStar size={13} color='#ffc632' />
                      {item.rating.toFixed(1)}
                    </li>
                  </ul>
                </Link>
              )}
            </SwiperSlide>
          ))
        ) : (
          <div>과자 목록이 없습니다.</div>
        )}
      </Swiper>
      <h2>리뷰가 많은 과자</h2>
      <Swiper
        slidesPerView={3.2}
        breakpoints={{ 600: { slidesPerView: 3 } }}
        navigation
        modules={[Navigation]}
      >
        {topReviewSnackList.length ? (
          topReviewSnackList.map((item) => (
            <SwiperSlide key={item.id}>
              {loadTopReviewSnackLoading ? (
                <HomeSkeleton />
              ) : (
                <Link to={`/snack/${item.id}`} key={item.id}>
                  <ul className={styles.infoWrapper}>
                    <li>
                      <img
                        src={`http://localhost:3065/snackimage/${item.imagesrc}`}
                        alt={item.name}
                        width='120'
                        height='120'
                      />
                    </li>
                    <li>{item.name}</li>
                    <li>{item.brand}</li>
                    <li>{item.count} 리뷰</li>
                  </ul>
                </Link>
              )}
            </SwiperSlide>
          ))
        ) : (
          <div>과자 목록이 없습니다.</div>
        )}
      </Swiper>
    </div>
  )
}

export default Home
