import React from 'react'
import './footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='footer'>
      <p className="legal">
        Copyright &copy; {currentYear} All rights reserved | This template is made with ReactJS by <span className='name'>Arunpandian</span>
      </p>
    </footer>
  )
}

export default Footer