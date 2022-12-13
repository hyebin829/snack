import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from 'components/Layout'
import Home from './Home'
import NotFound from './NotFoundPage'
import LoadingPage from './LoadingPage'
import styles from './app.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ReactGA from 'react-ga'

const ProfilePage = lazy(() => import('./ProfilePage'))
const EditProfilePage = lazy(() => import('./EditProfilePage'))
const MyFavoritePage = lazy(() => import('./MyFavoritePage'))
const MyReviewPage = lazy(() => import('./MyReviewPage'))
const SearchPage = lazy(() => import('./SearchPage'))
const SnackPage = lazy(() => import('./SnackPage'))
const TRACKING_ID = process.env.REACT_APP_TRACKING_ID || ''
ReactGA.initialize(TRACKING_ID)

const App = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [location])

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
