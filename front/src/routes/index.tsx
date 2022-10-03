import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from 'components/Layout'
import Home from './Home'
import NotFound from './NotFoundPage'
import LoadingPage from './LoadingPage'
import styles from './app.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ProfilePage = lazy(() => import('./ProfilePage'))
const EditProfilePage = lazy(() => import('./EditProfilePage'))
const MyFavoritePage = lazy(() => import('./MyFavoritePage'))
const MyReviewPage = lazy(() => import('./MyReviewPage'))
const SearchPage = lazy(() => import('./SearchPage'))
const SnackPage = lazy(() => import('./SnackPage'))

const App = () => {
  return (
    <div className={styles.app}>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/editprofile' element={<EditProfilePage />} />
            <Route path='/myfavorite' element={<MyFavoritePage />} />
            <Route path='/myreview' element={<MyReviewPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/snack/:id' element={<SnackPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
