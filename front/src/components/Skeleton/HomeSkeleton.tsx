import styles from './homeSkeleton.module.scss'

const HomeSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonName} />
      <div className={styles.skeletonBrand} />
      <div className={styles.skeletonCount} />
    </div>
  )
}

export default HomeSkeleton
