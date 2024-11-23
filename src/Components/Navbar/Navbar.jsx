import React, { useState } from 'react'
import './navbar.css'
import brandLogo from '../../assets/brandLogo.png'
import { Link } from 'react-router-dom';

const Navbar = ({isAuthenticated}) => {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container nav-container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={brandLogo} alt="company-logo" width="40" height="40" />
                    <span className='brand-name text-white fs-3' style={{ fontWeight: '700' }}>Cinema World</span>
                </Link>
                <form className="d-flex justify-content-center search-form w-50" role="search">
                    <i className="bi bi-search fs-4 text-dark ps-2"></i>
                    <input className="form-control search-input" type="search" placeholder="Search" aria-label="Search" />
                </form>
                <div className="navbar-nav-items position-relative">
                    <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white active" aria-current="page" to="/"><i class="bi bi-house-door"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/favorite"><i class="bi bi-heart"></i> Favorites</Link>
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
                                            <Link to="/signin" className="popover-item border-bottom">Sign In</Link>
                                            <Link to="/signup" className="popover-item">Sign Up</Link>
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