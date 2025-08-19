import React from 'react';
import styles from "../../styles/footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <div className={styles.footerBrand}>
                            <i className="fas fa-dumbbell"></i>
                            <span>SportBooking</span>
                        </div>
                        <p>Tu plataforma de confianza para reservar espacios deportivos</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Enlaces</h4>
                        <ul>
                            <li><a href="#home">Inicio</a></li>
                            <li><a href="establishments.html">Establecimientos</a></li>
                            <li><a href="#about">Acerca de</a></li>
                            <li><a href="#contact">Contacto</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Contacto</h4>
                        <p><i className="fas fa-envelope"></i> info@sportbooking.com</p>
                        <p><i className="fas fa-phone"></i> +1 234 567 890</p>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; 2025 SportBooking. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;