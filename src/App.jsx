import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './Components/Loader/Loader'

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const Home = lazy(() => import('./Pages/Home/Home'))
const Favorite = lazy(() => import('./Pages/Favorite/Favorite'))
const Error = lazy(() => import('./Pages/Error/Error'))
const Footer = lazy(() => import('./Components/Footer/Footer'))

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <main>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </Suspense>
  )
}

export default App