import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>SNACKPEDIA</div>
      <div className={styles.addressWrapper}>
        <div className={styles.contact}>CONTACT ME</div>
        <address>e-mail : smilerain779@gmail.com</address>
      </div>
    </footer>
  )
}

export default Footer
