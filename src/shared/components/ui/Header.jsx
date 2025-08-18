import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from "../../styles/header.module.css";
import { IoFootball } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaRegUser, FaUserLarge } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { Button1 } from './Buttons';

const Header = ({position = 'sticky'}) => {
    const location = useLocation();
    const navigate = useNavigate();
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

    // Funcion para ir a ruta de inicio de sesion
    const handleLoginClick = () => {
        navigate('/login');
        closeMenu();
    }

    return (
        <header className={styles.header} style={{position}}>
            <nav className={styles.navbar}>
                <div className={styles.navBrand}>
                    <IoFootball className={styles.logo} />
                    <span>Booking Sport</span>
                </div>
                <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
                    <Link to="/" className={isActive('/')} onClick={closeMenu}><AiFillHome />Inicio</Link>
                    <Link to="/facilityes" className={isActive('/facilityes')} onClick={closeMenu}><LuLayoutDashboard />Establecimientos</Link>
                    <Link to="/profile" className={isActive('/profile')} onClick={closeMenu}>Perfil</Link>
                    <Link to="/admin" className={isActive('/admin')} onClick={closeMenu}>Admin</Link>
                    <Button1 text='Iniciar Sesion' Icon={FaRegUser} onClick={handleLoginClick} />
                </ul>
                <div className={`${styles.navToggle} ${isMenuOpen ? styles.navToggleOpen : ''}` } onClick={toggleMenu}>
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