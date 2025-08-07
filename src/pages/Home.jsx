import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Footer from '../components/layout/footer/Footer';
import Style from '../styles/Home/home.module.css';

const Home = () => {
    return (
        <div className={Style.home}>
            <Header />

            <section className={Style.hero}>
                <div className={Style.heroContent}>
                    <h1 className={Style.heroTitle}>Reserva tu espacio deportivo favorito</h1>
                    <p className={Style.heroSubtitle}>
                        Encuentra y reserva canchas, gimnasios y espacios deportivos de manera fácil y rápida
                    </p>
                    <div className={Style.heroButtons}>
                        <Link to='/facilityes' className={Style.btnPrimary}>Explorar Establecimientos</Link>
                        <a href="#features" className={Style.btnSecondary}>Conocer más</a>
                    </div>
                </div>

                <div className={Style.heroImage}>
                    <div className={Style.sportsField3d}>
                        <div className={Style.fieldContainer}>
                            <div className={Style.soccerField}>
                                <div className={`${Style.fieldLine} ${Style.centerCircle}`}></div>
                                <div className={`${Style.fieldLine} ${Style.centerLine}`}></div>
                                <div className={`${Style.fieldLine} ${Style.penaltyArea} ${Style.left}`}></div>
                                <div className={`${Style.fieldLine} ${Style.penaltyArea} ${Style.right}`}></div>
                                <div className={`${Style.fieldLine} ${Style.goalArea} ${Style.left}`}></div>
                                <div className={`${Style.fieldLine} ${Style.goalArea} ${Style.right}`}></div>
                                <div className={`${Style.goal} ${Style.left}`}></div>
                                <div className={`${Style.goal} ${Style.right}`}></div>
                                <div className={Style.ball}></div>
                            </div>
                        </div>
                    </div>

                    <div className={Style.heroCards}>
                        <div className={Style.heroCard}><h3>Fútbol</h3></div>
                        <div className={Style.heroCard}><h3>Básquet</h3></div>
                        <div className={Style.heroCard}><h3>Tenis</h3></div>
                    </div>
                </div>
            </section>

            <section id="features" className={Style.features}>
                <div className={Style.container}>
                    <h2 className={Style.sectionTitle}>¿Por qué elegir SportBooking?</h2>
                    <div className={Style.featuresGrid}>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}><i className="fas fa-search"></i></div>
                            <h3>Búsqueda Fácil</h3>
                            <p>Encuentra establecimientos deportivos cerca de ti con filtros avanzados</p>
                        </div>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}><i className="fas fa-calendar-alt"></i></div>
                            <h3>Reserva Instantánea</h3>
                            <p>Sistema de reservas en tiempo real con calendario interactivo</p>
                        </div>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}><i className="fas fa-star"></i></div>
                            <h3>Calificaciones</h3>
                            <p>Lee reseñas y calificaciones de otros usuarios</p>
                        </div>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}><i className="fas fa-mobile-alt"></i></div>
                            <h3>Acceso Móvil</h3>
                            <p>Reserva desde cualquier dispositivo, en cualquier momento</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={Style.popularSports}>
                <div className={Style.container}>
                    <h2 className={Style.sectionTitle}>Deportes Populares</h2>
                    <div className={Style.sportsGrid}>
                        <div className={Style.sportItem}>
                            <i className="fas fa-futbol"></i>
                            <span>Fútbol</span>
                        </div>
                        <div className={Style.sportItem}>
                            <i className="fas fa-basketball-ball"></i>
                            <span>Básquet</span>
                        </div>
                        <div className={Style.sportItem}>
                            <i className="fas fa-volleyball-ball"></i>
                            <span>Voleibol</span>
                        </div>
                        <div className={Style.sportItem}>
                            <i className="fas fa-table-tennis"></i>
                            <span>Tenis de Mesa</span>
                        </div>
                        <div className={Style.sportItem}>
                            <i className="fas fa-dumbbell"></i>
                            <span>Gimnasio</span>
                        </div>
                        <div className={Style.sportItem}>
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
