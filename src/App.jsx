import React, { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './Components/Loader/Loader'

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const Home = lazy(() => import('./Pages/Home/Home'))
const Favorite = lazy(() => import('./Pages/Favorite/Favorite'))
const SignIn = lazy(() => import('./Components/SignIn/SignIn'))
const SignUp = lazy(() => import('./Components/SignUp/SignUp'))
const Error = lazy(() => import('./Pages/Error/Error'))
const Footer = lazy(() => import('./Components/Footer/Footer'))

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Suspense fallback={<Loader />}>
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/signin' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/signup' element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </Suspense>
  )
}

export default App