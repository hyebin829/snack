import GNB from 'components/GNB'
import Header from 'components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Header />
      <GNB />
      <main>
        <Outlet />
      </main>
      <footer />
    </div>
  )
}

export default Layout
