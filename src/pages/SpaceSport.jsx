import React, { useState, useEffect } from 'react';
import '../styles/SpaceSport/spaceSport.css';
import { LuHeart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { RiTimeFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { } from "react-icons/fa6";
import AddReview from '../components/SpaceSport/AddReview';
import Calendars from '../components/SpaceSport/Calendars';
import ListTime from '../components/SpaceSport/ListTime';
import ReservationSummary from '../components/SpaceSport/ReservationSummary';
import { Button1, Button2 } from '../components/ui/Buttons';
import { ReservationProvider } from '../context/ReservationContext';
import { sportFacility, reviews } from '../data/Reservas/dataSpace';
import { useStoreSpaceSport } from '../hooks/useStoreSpaceSport';

const SpaceSport = () => {
    // Estados para manejo de deportes y espacios
    const [selectedSport, setSelectedSport] = useState(0);
    const [selectedSpace, setSelectedSpace] = useState(0);
    const [currentGallery, setCurrentGallery] = useState([]);

    // Obtener el deporte y espacio actualmente seleccionados
    const currentSportData = sportFacility.sports_available[selectedSport];
    const currentSpaceData = currentSportData?.spaces[selectedSpace];

    // Inicializar galería al montar el componente
    useEffect(() => {
        const initialSpaceData = sportFacility.sports_available[0]?.spaces[0];
        if (initialSpaceData?.gallery) {
            setCurrentGallery(initialSpaceData.gallery);
        }
    }, []);

    // Actualizar galería cuando cambie la selección
    useEffect(() => {
        if (currentSpaceData?.gallery) {
            setCurrentGallery(currentSpaceData.gallery);
        }
    }, [currentSpaceData]);

    const {
        calendarsOpen,
        setCalendarsOpen,
        listTimeOpen,
        setListTimeOpen,
        reservationSummaryOpen,
        setReservationSummaryOpen,
        fechaSeleccionada,
        manejarSeleccionFecha,
        manejarMostrarResumen,
        manejarVolverAListTime,
        manejarVolverACalendario,
        manejarConfirmarReserva,
        manejarDesplazamientoIzquierda,
        manejarDesplazamientoDerecha,
        redirectWhatsApp,
        imagenPrincipal,
        setImagenPrincipal,
        indiceDesplazamiento,
    } = useStoreSpaceSport(currentGallery);

    // Función para cambiar de espacio
    const handleSpaceChange = (spaceIndex) => {
        setSelectedSpace(spaceIndex);
    };

    // Funcion para renderizar las estrellas
    const renderStars = (calificacion) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} className={`estrella ${index < calificacion ? 'activa' : ''}`} />
        ));
    };

    return (
        <ReservationProvider>
            <div className="space-sport">
                {/* Contenido principal arriba */}
                <div className="contenido-principal">
                    {/* Header para movil */}
                    <div className="header-info header-info-movil">
                        <h1>{sportFacility.name_facility}</h1>
                        <div className="calificacion-likes">
                            <div className="calificacion">
                                <span>
                                    {renderStars(sportFacility.calification)}
                                </span>
                                <span className="numero-calificacion">{sportFacility.calification} ({reviews.length} reseñas)</span>
                            </div>
                            <button className='likes'><LuHeart strokeWidth={2} /> {sportFacility.like} </button>
                        </div>
                    </div>
                    {/* Sección de imágenes */}
                    <div className="seccion-imagenes">
                        <div className="imagen-principal">
                            <img src={imagenPrincipal} alt="Cancha principal" />
                        </div>
                        <div className='images'>
                            <IoIosArrowBack
                                className='img-arrow-1'
                                onClick={manejarDesplazamientoIzquierda}
                            />
                            <div className="galeria-imagenes">
                                <div
                                    className="galeria-contenedor"
                                    style={{
                                        transform: `translateX(-${indiceDesplazamiento * 110}px)`,
                                        transition: 'transform 0.3s ease'
                                    }}
                                >
                                    {currentGallery.map((imagen, index) => (
                                        <img
                                            key={index}
                                            className={`imagen-miniatura ${imagen === imagenPrincipal ? 'activa' : ''}`}
                                            onClick={() => setImagenPrincipal(imagen)}
                                            src={imagen}
                                            alt={`Vista ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <IoIosArrowForward
                                className='img-arrow-2'
                                onClick={manejarDesplazamientoDerecha}
                            />
                        </div>
                        {/* selector de deportes disponibles */}
                        <div className="spaces">
                            {sportFacility.sports_available.map((sport, index) => (
                                <button
                                    key={index}
                                    className={selectedSport === index ? 'active' : ''}
                                    onClick={() => {
                                        setSelectedSport(index);
                                        setSelectedSpace(0); // Reset space selection when sport changes
                                    }}
                                >
                                    {sport.sport_type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Información del establecimiento */}
                    <div className="info-establecimiento">
                        <div className="header-info">
                            <h1>{sportFacility.name_facility}</h1>
                            <div className="calificacion-likes">
                                <div className="calificacion">
                                    <span>
                                        {renderStars(sportFacility.calification)}
                                    </span>
                                    <span className="numero-calificacion">{sportFacility.calification} ({reviews.length} reseñas)</span>
                                </div>
                                <button className='likes'><LuHeart strokeWidth={2} /> {sportFacility.like} </button>
                            </div>
                        </div>

                        <div className="horarios">
                            <h3>Horarios de Atención</h3>
                            <div className="horarios-lista">
                                {sportFacility.hours.map((schedule, index) => (
                                    <div key={index} className="item-info">
                                        <span>{schedule.days}</span>
                                        <p>{schedule.hour}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="caracteristicas">
                            <h3>Características</h3>
                            <div className="caracteristicas-grid">
                                {sportFacility.general_characteristics.map((characteristic, index) => {
                                    const getIcon = (char) => {
                                        if (char.includes('Iluminación')) return '💡';
                                        if (char.includes('Vestuarios')) return '🚿';
                                        if (char.includes('Estacionamiento')) return '🅿️';
                                        if (char.includes('espectadores')) return '👥';
                                        if (char.includes('Restaurante')) return '🍽️';
                                        return '⭐';
                                    };
                                    return (
                                        <div key={index} className="item-info">
                                            <span>{getIcon(characteristic)} </span>
                                            <span>{characteristic}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="horarios">
                            <h3>Precios</h3>
                            <div className="horarios-lista">
                                {sportFacility.prices.map((price, index) => (
                                    <div key={index} className="item-info">
                                        <span>{index === 1 ? 'Hasta' : 'Desde'} </span>
                                        <p>{price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ubicacion */}
                        <div className="ubicacion">
                            <h3>Dirección</h3>
                            <p>{sportFacility.address}</p>
                        </div>
                        <div className="botones-accion">
                            <Button1 Icon={RiTimeFill} text='ReservarAhora' onClick={() => setCalendarsOpen(true)} />
                            <Button2 Icon={FaWhatsapp} text='Contáctamos' onClick={redirectWhatsApp} />
                        </div>
                    </div>
                </div>

                {/* Sección de selección de espacios */}
                <div className="spaces-selection">
                    <h3>Espacios de {currentSportData?.sport_type}</h3>
                    <div className="spaces-grid">
                        {currentSportData?.spaces.map((space, index) => (
                            <div
                                key={space.id}
                                className={`space-card ${selectedSpace === index ? 'selected' : ''}`}
                                onClick={() => handleSpaceChange(index)}
                            >
                                <div className="space-card-header">
                                    <h4>{space.name}</h4>
                                    <span className="space-pricee">${space.price_per_hour}/hora</span>
                                </div>
                                <div className="space-details">
                                    <p><strong>Dimensiones:</strong> {space.dimensions}</p>
                                    <p><strong>Capacidad:</strong> {space.capacity} personas</p>
                                    <p><strong>Superficie:</strong> {space.surface_type}</p>
                                    <span className={`availability-status ${space.available ? 'available' : 'unavailable'}`}>
                                        {space.available ? 'Disponible' : 'No disponible'}
                                    </span>
                                </div>
                                <div className="body-space">
                                    {space.equipment && space.equipment.length > 0 && (
                                        <div className="space-equipment">
                                            <strong>Equipamiento:</strong>
                                            <ul>
                                                {space.equipment.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {space.features && space.features.length > 0 && (
                                        <div className="space-features">
                                            <strong>Características:</strong>
                                            <ul>
                                                {space.features.map((feature, idx) => (
                                                    <li key={idx}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* seccion descripcion */}
                <div className="descripcion">
                    <h3>Descripción</h3>
                    <p>
                        Cancha de fútbol profesional con césped sintético de última generación.
                        Perfecta para partidos de fútbol 11, entrenamientos y eventos deportivos.
                        Cuenta con iluminación LED, vestuarios equipados, estacionamiento y
                        área de espectadores techada.
                    </p>
                </div>

                {/* Sección de comentarios */}
                <div className="seccion-comentarios">
                    <h2>Comentarios de Usuarios</h2>
                    <div className="comentarios-lista">
                        {reviews.map((review, index) => (
                            <div key={index} className="comentario-item">
                                <div className="comentario-header">
                                    <div className="usuario-info">
                                        <div className="avatar">{review.name.charAt(0)}</div>
                                        <div className="usuario-detalles">
                                            <h4>{review.name}</h4>
                                            <span className="fecha">{review.date}</span>
                                        </div>
                                    </div>
                                    <div className="calificacion-comentario">{renderStars(review.calification)}</div>
                                </div>
                                <p className="comentario-texto">{review.opinion}</p>
                            </div>
                        ))}
                    </div>
                    {/* Add Review */}
                    <AddReview />
                </div>
                <Calendars
                    open={calendarsOpen}
                    onClose={() => setCalendarsOpen(false)}
                    onDateSelect={manejarSeleccionFecha}
                />

                <ListTime
                    open={listTimeOpen}
                    onClose={() => setListTimeOpen(false)}
                    fecha={fechaSeleccionada}
                    onShowReservation={manejarMostrarResumen}
                    onBackToCalendar={manejarVolverACalendario}
                />

                <ReservationSummary
                    open={reservationSummaryOpen}
                    onClose={() => setReservationSummaryOpen(false)}
                    onConfirm={manejarConfirmarReserva}
                    onBackToListTime={manejarVolverAListTime}
                />
            </div>
        </ReservationProvider>
    );
};

export default SpaceSport;