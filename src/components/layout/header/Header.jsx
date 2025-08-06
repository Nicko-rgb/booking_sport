import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "../../../styles/HeaderFooter/header.css";

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-brand">
                    <i className="fas fa-dumbbell"></i>
                    <span>SportBooking</span>
                </div>
                <ul className="nav-menu">
                    <li><Link to="/" className={isActive('/')}>Inicio</Link></li>
                    <li><Link to="/facilityes" className={isActive('/facilityes')}>Establecimientos</Link></li>
                    <li><Link to="/profile" className={isActive('/profile')}>Perfil</Link></li>
                    <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
                </ul>
                <div className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    )
}

export default Header
