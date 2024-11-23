import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Favorite from './Pages/Favorite/Favorite'
import Error from './Pages/Error/Error'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App