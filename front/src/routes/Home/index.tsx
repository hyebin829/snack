import styles from './home.module.scss'

const Home = () => {

  

  return (
    <div className={styles.homeWrapper}>
      <div>인기 과자</div>
      <div>별점이 높은 과자</div>
      <div>최근에 추가됐어요!</div>
    </div>
  )
}

export default Home
