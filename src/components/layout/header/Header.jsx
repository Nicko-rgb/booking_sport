import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "../../../styles/HeaderFooter/header.module.css";
import { IoFootball } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path
            ? `${styles.navLink} ${styles.active}`
            : styles.navLink;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navBrand}>
                    <IoFootball className={styles.logo} />
                    <span>Booking Sport</span>
                </div>
                <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
                    <Link to="/" className={isActive('/')} onClick={closeMenu}><AiFillHome />Inicio</Link>
                    <Link to="/facilityes" className={isActive('/facilityes')} onClick={closeMenu}><LuLayoutDashboard />Establecimientos</Link>
                    <Link to="/profile" className={isActive('/profile')} onClick={closeMenu}>Perfil</Link>
                    <Link to="/login" className={isActive('/login')} onClick={closeMenu}>Login</Link>
                </ul>
                <div className={`${styles.navToggle} ${isMenuOpen ? styles.navToggleOpen : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
            </nav>
        </header>
    )
}

export default Header