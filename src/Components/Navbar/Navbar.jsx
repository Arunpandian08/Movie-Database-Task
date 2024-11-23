import React, { useState } from 'react'
import './navbar.css'
import brandLogo from '../../assets/brandLogo.png'

const Navbar = () => {
    const [showPopover, setShowPopover] = useState(false);
    const isAuthenticated = false; // Replace with actual authentication logic

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container nav-container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={brandLogo} alt="company-logo" width="40" height="40" />
                    <span className='brand-name text-white fs-3' style={{ fontWeight: '700' }}>Cinema World</span>
                </a>
                <form className="d-flex justify-content-center search-form w-50" role="search">
                    <i className="bi bi-search fs-4 text-dark ps-2"></i>
                    <input className="form-control search-input" type="search" placeholder="Search" aria-label="Search" />
                </form>
                <div className="navbar-nav-items position-relative">
                    <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-white active" aria-current="page" href="#"><i class="bi bi-house-door"></i> Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#"><i class="bi bi-heart"></i> Favorites</a>
                        </li>
                        <li className="nav-item user-icon ms-5" onClick={togglePopover}>
                            <i className="bi bi-person-circle fs-2"></i>
                        </li>
                    </ul>
                            {showPopover && (
                                <div className="popover-container">
                                    {isAuthenticated ? (
                                        <div>
                                            <a href="/profile" className="popover-item">Profile</a>
                                            <hr />
                                            <a href="/logout" className="popover-item">Logout</a>
                                        </div>
                                    ) : (
                                        <div>
                                            <a href="/signin" className="popover-item border-bottom">Sign In</a>
                                            <a href="/signup" className="popover-item">Sign Up</a>
                                        </div>
                                    )}
                                </div>
                            )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar