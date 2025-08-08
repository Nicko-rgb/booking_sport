import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Header from "../shared/components/ui/Header";
import Footer from '../shared/components/ui/Footer';
import Style from '../styles/Home/home.module.css';
import footballerAnimation from '../assets/animations/footballer.json';
import GPSLocation from '../assets/animations/GPSLocation.json';
import BookingIco from '../assets/animations/booking.json';
import ResponsiveIco from '../assets/animations/Responsive.json';
import RatingIco from '../assets/animations/Rating.json';
import { TbMapPinSearch } from "react-icons/tb";
import { HiSquaresPlus } from "react-icons/hi2";
import { Button1, Button2 } from "../shared/components/ui/Buttons";

const Home = () => {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate('/facilityes')
    }

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
                        <Button1 Icon={TbMapPinSearch} onClick={handleExplore} text="Explorar Establecimientos" />
                        <Button2 Icon={HiSquaresPlus} text="Conocer más" />
                    </div>
                </div>

                <div className={Style.heroImage}>
                    {/* Lottie Animation */}
                    <div className={Style.lottieContainer}>
                        <Lottie 
                            animationData={footballerAnimation}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '400px' }}
                        />
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
                            <div className={Style.featureIcon}>
                                <Lottie 
                                    animationData={GPSLocation}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <h3>Búsqueda Fácil</h3>
                            <p>Encuentra establecimientos deportivos cerca de ti con filtros avanzados</p>
                        </div>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}>
                                <Lottie 
                                    animationData={BookingIco}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <h3>Reserva Instantánea</h3>
                            <p>Sistema de reservas en tiempo real con calendario interactivo</p>
                        </div>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}>
                                <Lottie 
                                    animationData={RatingIco}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <h3>Calificaciones</h3>
                            <p>Lee reseñas y calificaciones de otros usuarios</p>
                        </div>
                        <div className={Style.featureCard}>
                            <div className={Style.featureIcon}>
                                <Lottie 
                                    animationData={ResponsiveIco}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
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
