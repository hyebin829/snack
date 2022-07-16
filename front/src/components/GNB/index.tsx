import { NavLink, useParams } from 'react-router-dom'
import cx from 'classnames'

const GNB = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' />
        </li>
      </ul>
    </nav>
  )
}

export default GNB
