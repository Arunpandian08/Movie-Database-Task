import React, { useState } from 'react'
import './navbar.css'
import brandLogo from '../../assets/brandLogo.png'
import { NavLink, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            setIsAuthenticated(false)
        })
            .catch((error) => {
                console.error('Logout error:', error);

            })
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container nav-container position-relative">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src={brandLogo} alt="company-logo" width="40" height="40" />
                    <span className='brand-name text-white fs-3 d-none d-lg-inline' style={{ fontWeight: '700' }}>Cinema World</span>
                </NavLink>

                <div className="navbar-nav-items mx-auto">
                    <ul className="navbar-nav align-items-center mb-2 mb-lg-0 flex-row">
                        <li className="nav-item me-4">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} text-white`} aria-current="page" to="/">
                                <i className="bi bi-house-door"></i> Movies List
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/favorite">
                                <i className="bi bi-bookmark"></i> Favorites
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item user-icon ms-5" onClick={togglePopover}>
                        {isAuthenticated ? <i className="bi bi-person-circle fs-2"></i> : <i class="bi bi-person-add fs-2"></i>}
                    </li>
                </ul>
                {showPopover && (
                    <div className="popover-container" onClick={togglePopover}>
                        {isAuthenticated ? (
                            <div>
                                <a href="/" className="popover-item border-bottom"><i class="bi bi-person"></i> Profile</a>
                                <a href='/' className="popover-item" onClick={handleLogout}><i class="bi bi-power"></i> Logout</a>
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
        </nav >
    )
}

export default Navbar