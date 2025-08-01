import React from 'react'
import "../../../styles/header.css"
const Header = ({ id = "" }) => {

    return (
        <div>
            {/* <!-- Header --> */}
            <header className="header">
                <nav className="navbar">
                    <div className="nav-brand">
                        <i className="fas fa-dumbbell"></i>
                        <span>SportBooking</span>
                        <p>{id}</p>
                    </div>
                    <ul className="nav-menu">
                        <li><a href="#home" className="nav-link active">Inicio</a></li>
                        <li><a href="establishments.html" className="nav-link">Establecimientos</a></li>
                        <li><a href="#about" className="nav-link">Acerca de</a></li>
                        <li><a href="/space-sport" className="nav-link">Pagina de Espacio</a></li>
                    </ul>
                    <div className="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header
