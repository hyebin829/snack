import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect } from 'react'
import styles from './home.module.scss'
import { loadPopularSnack, loadTopRatingSnack, loadTopReviewSnack } from 'actions/post'
import { loadMyInfo } from 'actions/user'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { AiFillStar } from 'react-icons/ai'
import { GoHeart } from 'react-icons/go'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

const Home = () => {
  const dispatch = useAppDispatch()
  const { popularSnackList, topRatingSnackList, topReviewSnackList } = useAppSelector(
    (state) => state.post
  )

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    arrows: true,
  }

  useEffect(() => {
    dispatch(loadPopularSnack())
    dispatch(loadTopRatingSnack())
    dispatch(loadTopReviewSnack())
    dispatch(loadMyInfo())
  }, [dispatch])

  return (
    <div className={styles.homeWrapper}>
      <h2>인기 과자</h2>
      <div className={styles.container}>
        <Slider {...settings} className={styles.slicklist}>
          {popularSnackList.map((item) => (
            <Link to={`/snack/${item.id}`} key={item.id}>
              <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
              <li>{item.name}</li>
              <li>{item.brand}</li>
              <li>
                <GoHeart size={13} /> {item.count}
              </li>
            </Link>
          ))}
        </Slider>
      </div>
      <h2>별점이 높은 과자</h2>
      <Slider {...settings}>
        {topRatingSnackList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id}>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
            <li>{item.name}</li>
            <li>
              <AiFillStar size={12} />
              {item.rating.toFixed(1)}
            </li>
            <li>{item.brand}</li>
          </Link>
        ))}
      </Slider>
      <h2>리뷰가 많은 과자</h2>
      <Slider {...settings}>
        {topReviewSnackList.map((item) => (
          <Link to={`/snack/${item.id}`} key={item.id}>
            <img src={`http://localhost:3065/snackimage/${item.imagesrc}`} alt={item.name} />
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.count} 리뷰</li>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default Home
