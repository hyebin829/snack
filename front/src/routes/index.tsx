import Layout from 'components/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import ProfilePage from './ProfilePage'
import ReviewWritePage from './ReviewWritePage'
import SearchPage from './SearchPage'
import SnackPage from './SnackPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/snack/:id' element={<SnackPage />} />
          <Route path='/snack/:id/review' element={<ReviewWritePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
