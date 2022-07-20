import Layout from 'components/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import ProfilePage from './ProfilePage'
import SearchPage from './SearchPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
