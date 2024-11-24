import React, { useState } from 'react'
import './navbar.css'
import brandLogo from '../../assets/brandLogo.png'
import { NavLink, Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated,setSearchTerm }) => {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container nav-container">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src={brandLogo} alt="company-logo" width="40" height="40" />
                    <span className='brand-name text-white fs-3' style={{ fontWeight: '700' }}>Cinema World</span>
                </NavLink>
                <form className="d-flex justify-content-center search-form w-50" role="search">
                    <i className="bi bi-search fs-4 text-dark ps-2"></i>
                    <input
                        className="form-control search-input"
                        type="search"
                        placeholder="Search Movies by title"
                        aria-label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
                <div className="navbar-nav-items position-relative">
                    <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} text-white`} aria-current="page" to="/"><i className="bi bi-house-door"></i> Movies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/favorite"><i className="bi bi-bookmark"></i> Favorites</NavLink>
                        </li>
                        <li className="nav-item user-icon ms-5" onClick={togglePopover}>
                            <i className="bi bi-person-circle fs-2"></i>
                        </li>
                    </ul>
                    {showPopover && (
                        <div className="popover-container" onClick={togglePopover}>
                            {isAuthenticated ? (
                                <div>
                                    <a href="/" className="popover-item border-bottom"><i class="bi bi-person"></i> Profile</a>
                                    <span className="popover-item"><i class="bi bi-power"></i> Logout</span>
                                </div>
                            ) : (
                                <div>
                                    <NavLink to="/signin" className="popover-item border-bottom">Sign In</NavLink>
                                    <NavLink to="/signup" className="popover-item">Sign Up</NavLink>
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