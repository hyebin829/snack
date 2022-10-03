import Spiner from 'components/Spiner'
import styles from './loading.module.scss'

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <Spiner />
    </div>
  )
}

export default LoadingPage
