import React from 'react'
import "../../../styles/header.css"

const Footer = () => {
  return (
    <div>
       {/* <!-- Footer --> */}
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-brand">
                        <i class="fas fa-dumbbell"></i>
                        <span>SportBooking</span>
                    </div>
                    <p>Tu plataforma de confianza para reservar espacios deportivos</p>
                </div>
                <div class="footer-section">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="establishments.html">Establecimientos</a></li>
                        <li><a href="#about">Acerca de</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p><i class="fas fa-envelope"></i> info@sportbooking.com</p>
                    <p><i class="fas fa-phone"></i> +1 234 567 890</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 SportBooking. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    </div>
  )
}

export default Footer



