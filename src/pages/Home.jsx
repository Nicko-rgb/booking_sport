import React from "react";
import "../styles/Home/home.css";
import { Link } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Footer from '../components/layout/footer/Footer';

const Home = () => {
    return (
        <div className="home">
            <Header />
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Reserva tu espacio deportivo favorito</h1>
                    <p className="hero-subtitle">Encuentra y reserva canchas, gimnasios y espacios deportivos de manera fácil y rápida</p>
                    <div className="hero-buttons">
                        <Link to='/facilityes' className="btn btn-primary">Explorar Establecimientos</Link>
                        <a href="#features" className="btn btn-secondary">Conocer más</a>
                    </div>
                </div>
                <div className="hero-image">
                    {/* Espacio para objeto 3D */}
                    <div className="sports-field-3d">
                        <div className="field-container">
                            <div className="soccer-field">
                                <div className="field-line center-circle"></div>
                                <div className="field-line center-line"></div>
                                <div className="field-line penalty-area left"></div>
                                <div className="field-line penalty-area right"></div>
                                <div className="field-line goal-area left"></div>
                                <div className="field-line goal-area right"></div>
                                <div className="goal left"></div>
                                <div className="goal right"></div>
                                <div className="ball"></div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-cards">
                        <div className="hero-card">

                            <h3>Fútbol</h3>
                        </div>
                        <div className="hero-card">

                            <h3>Básquet</h3>
                        </div>
                        <div className="hero-card">

                            <h3>Tenis</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Features Section --> */}
            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title">¿Por qué elegir SportBooking?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-search"></i>
                            </div>
                            <h3>Búsqueda Fácil</h3>
                            <p>Encuentra establecimientos deportivos cerca de ti con filtros avanzados</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <h3>Reserva Instantánea</h3>
                            <p>Sistema de reservas en tiempo real con calendario interactivo</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-star"></i>
                            </div>
                            <h3>Calificaciones</h3>
                            <p>Lee reseñas y calificaciones de otros usuarios</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <h3>Acceso Móvil</h3>
                            <p>Reserva desde cualquier dispositivo, en cualquier momento</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Popular Sports Section --> */}
            <section className="popular-sports">
                <div className="container">
                    <h2 className="section-title">Deportes Populares</h2>
                    <div className="sports-grid">
                        <div className="sport-item">
                            <i className="fas fa-futbol"></i>
                            <span>Fútbol</span>
                        </div>
                        <div className="sport-item">
                            <i className="fas fa-basketball-ball"></i>
                            <span>Básquet</span>
                        </div>
                        <div className="sport-item">
                            <i className="fas fa-volleyball-ball"></i>
                            <span>Voleibol</span>
                        </div>
                        <div className="sport-item">
                            <i className="fas fa-table-tennis"></i>
                            <span>Tenis de Mesa</span>
                        </div>
                        <div className="sport-item">
                            <i className="fas fa-dumbbell"></i>
                            <span>Gimnasio</span>
                        </div>
                        <div className="sport-item">
                            <i className="fas fa-swimmer"></i>
                            <span>Natación</span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
