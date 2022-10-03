import { FaSadTear } from 'react-icons/fa'
import styles from './notFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <span>
        <FaSadTear size={100} color='#d7d9dc' />
      </span>
      <span>존재하지 않는 페이지입니다.</span>
    </div>
  )
}

export default NotFound
