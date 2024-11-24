import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './Components/Loader/Loader'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Components/Firebase/firebase'

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const MoviesList = lazy(() => import('./Pages/MoviesList/MoviesList'))
const Favorite = lazy(() => import('./Pages/Favorite/Favorite'))
const SignIn = lazy(() => import('./Components/SignIn/SignIn'))
const SignUp = lazy(() => import('./Components/SignUp/SignUp'))
const Error = lazy(() => import('./Pages/Error/Error'))
const Footer = lazy(() => import('./Components/Footer/Footer'))

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false); 
      }
    });

    return () => unsubscribe();
  }, [setIsAuthenticated]);

  return (
    <Suspense fallback={<Loader />}>
      <Navbar
       isAuthenticated={isAuthenticated} 
       setIsAuthenticated={setIsAuthenticated}
       />
      <main>
        <Routes>
          <Route path='/' element={<MoviesList isAuthenticated={isAuthenticated} />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
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