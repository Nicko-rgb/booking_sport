import React from "react";
import  "../styles/header.css"
import Header from "../components/layout/header/Header";
{/* <styles /> */}
const home = ({id=""}) => {
  return (
    <div>
         {/* <!-- Hero Section --> */}
    <section id="home" class="hero">
        <div class="hero-content">
            <h1 class="hero-title">Reserva tu espacio deportivo favorito</h1>
            <p class="hero-subtitle">Encuentra y reserva canchas, gimnasios y espacios deportivos de manera fácil y rápida</p>
            <div class="hero-buttons">
                <a href="establishments.html" class="btn btn-primary">Explorar Establecimientos</a>
                <a href="#features" class="btn btn-secondary">Conocer más</a>
            </div>
        </div>
        <div class="hero-image">
            <div class="sports-field-3d">
                <div class="field-container">
                    <div class="soccer-field">
                        <div class="field-line center-circle"></div>
                        <div class="field-line center-line"></div>
                        <div class="field-line penalty-area left"></div>
                        <div class="field-line penalty-area right"></div>
                        <div class="field-line goal-area left"></div>
                        <div class="field-line goal-area right"></div>
                        <div class="goal left"></div>
                        <div class="goal right"></div>
                        <div class="ball"></div>
                    </div>
                </div>
            </div>
            <div class="hero-cards">
                <div class="hero-card">
                    <div class="card-image">
                        <svg viewBox="0 0 100 100" class="sport-svg">
                            <circle cx="50" cy="50" r="45" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
                            <path d="M20 50 L80 50 M50 20 L50 80" stroke="white" stroke-width="3"/>
                            <circle cx="50" cy="50" r="15" fill="none" stroke="white" stroke-width="2"/>
                            <circle cx="50" cy="50" r="2" fill="white"/>
                        </svg>
                    </div>
                    <h3>Fútbol</h3>
                </div>
                <div class="hero-card">
                    <div class="card-image">
                        <svg viewBox="0 0 100 100" class="sport-svg">
                            <rect x="10" y="20" width="80" height="60" fill="#FF9800" stroke="#E65100" stroke-width="2" rx="5"/>
                            <circle cx="50" cy="50" r="8" fill="none" stroke="white" stroke-width="2"/>
                            <rect x="45" y="15" width="10" height="5" fill="#E65100"/>
                            <path d="M25 35 Q50 25 75 35" stroke="white" stroke-width="2" fill="none"/>
                        </svg>
                    </div>
                    <h3>Básquet</h3>
                </div>
                <div class="hero-card">
                    <div class="card-image">
                        <svg viewBox="0 0 100 100" class="sport-svg">
                            <rect x="15" y="25" width="70" height="50" fill="#2196F3" stroke="#0D47A1" stroke-width="2" rx="3"/>
                            <rect x="20" y="30" width="60" height="40" fill="none" stroke="white" stroke-width="1"/>
                            <path d="M20 50 L80 50" stroke="white" stroke-width="2"/>
                            <circle cx="35" cy="40" r="3" fill="#FFEB3B"/>
                            <circle cx="65" cy="60" r="3" fill="#FFEB3B"/>
                        </svg>
                    </div>
                    <h3>Tenis</h3>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Features Section --> */}
    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">¿Por qué elegir SportBooking?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>Búsqueda Fácil</h3>
                    <p>Encuentra establecimientos deportivos cerca de ti con filtros avanzados</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h3>Reserva Instantánea</h3>
                    <p>Sistema de reservas en tiempo real con calendario interactivo</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3>Calificaciones</h3>
                    <p>Lee reseñas y calificaciones de otros usuarios</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Acceso Móvil</h3>
                    <p>Reserva desde cualquier dispositivo, en cualquier momento</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Popular Sports Section --> */}
    <section class="popular-sports">
        <div class="container">
            <h2 class="section-title">Deportes Populares</h2>
            <div class="sports-grid">
                <div class="sport-item">
                    <i class="fas fa-futbol"></i>
                    <span>Fútbol</span>
                </div>
                <div class="sport-item">
                    <i class="fas fa-basketball-ball"></i>
                    <span>Básquet</span>
                </div>
                <div class="sport-item">
                    <i class="fas fa-volleyball-ball"></i>
                    <span>Voleibol</span>
                </div>
                <div class="sport-item">
                    <i class="fas fa-table-tennis"></i>
                    <span>Tenis de Mesa</span>
                </div>
                <div class="sport-item">
                    <i class="fas fa-dumbbell"></i>
                    <span>Gimnasio</span>
                </div>
                <div class="sport-item">
                    <i class="fas fa-swimmer"></i>
                    <span>Natación</span>
                </div>
            </div>
        </div>
    </section>

      

    

    </div>
  );
};

export default home;
