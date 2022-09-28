import styles from './snackSkeleton.module.scss'

const SnackSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.snackImage} />
      <div className={styles.snackName} />
      <div className={styles.snackBrand} />
      <div className={styles.snackRating} />
    </div>
  )
}
export default SnackSkeleton
