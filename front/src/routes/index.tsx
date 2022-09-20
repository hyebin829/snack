import Layout from 'components/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import ProfilePage from './ProfilePage'
import SearchPage from './SearchPage'
import SnackPage from './SnackPage'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MyFavoritePage from './MyFavoritePage'
import MyReviewPage from './MyReviewPage'
import EditProfilePage from './EditProfilePage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/editprofile' element={<EditProfilePage />} />
          <Route path='/myfavorite' element={<MyFavoritePage />} />
          <Route path='/myreview' element={<MyReviewPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/snack/:id' element={<SnackPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
