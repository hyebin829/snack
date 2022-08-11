import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './GNB.module.scss'

import { HiHome, HiUser, HiSearch } from 'react-icons/hi'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <span>
              <HiHome size={20} />
            </span>
            <p>홈</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <span>
              <HiSearch size={20} />
            </span>
            <p>검색</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <span>
              <HiUser size={20} />
            </span>
            <p>프로필</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
