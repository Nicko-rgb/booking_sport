import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "../../../styles/HeaderFooter/header.module.css";

const Header = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path 
            ? `${styles.navLink} ${styles.active}` 
            : styles.navLink;
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navBrand}>
                    <i className="fas fa-dumbbell"></i>
                    <span>SportBooking</span>
                </div>
                <ul className={styles.navMenu}>
                    <li><Link to="/" className={isActive('/')}>Inicio</Link></li>
                    <li><Link to="/facilityes" className={isActive('/facilityes')}>Establecimientos</Link></li>
                    <li><Link to="/profile" className={isActive('/profile')}>Perfil</Link></li>
                    <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
                </ul>
                <div className={styles.navToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    )
}

export default Header