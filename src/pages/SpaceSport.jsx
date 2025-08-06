import React from 'react';
import '../styles/SpaceSport/spaceSport.css';
import { LuHeart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { RiTimeFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Calendars from '../components/SpaceSport/Calendars';
import ListTime from '../components/SpaceSport/ListTime';
import ReservationSummary from '../components/SpaceSport/ReservationSummary';
import { ReservationProvider } from '../context/ReservationContext';
import comentarios from '../data/Reservas/comentarios';
import { useStoreSpaceSport } from '../hooks/useStoreSpaceSport';
import { imagenesGaleria } from '../data/Reservas/galley'

const SpaceSport = () => {
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
    } = useStoreSpaceSport(imagenesGaleria);

    // Funcion para renderizar las estrellas
    const renderStars = (calificacion) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} className={`estrella ${index < calificacion ? 'activa' : ''}`} />
        ));
    };

    return (
        <ReservationProvider>
            <div className="space-sport">
                <div className="contenido-principal">
                {/* Sección de imágenes */}
                <div className="seccion-imagenes">
                    <div className="imagen-principal">
                        <img src={imagenPrincipal} alt="Cancha principal" />
                    </div>
                    <aside className='images'>
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
                                {imagenesGaleria.map((imagen, index) => (
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
                    </aside>
                    {/* selector de espacios */}
                    <div className="spaces">
                        <button className='active'>Fútbol</button>
                        <button>Voley</button>
                        <button>Piscina</button>
                    </div>
                </div>

                {/* Información del establecimiento */}
                <div className="info-establecimiento">
                    <div className="header-info">
                        <h1>Cancha de Fútbol "El Verde"</h1>
                        <div className="calificacion-likes">
                            <div className="calificacion">
                                {renderStars(4)}
                                <span className="numero-calificacion">4.8 (127 reseñas)</span>
                            </div>
                            <div className="likes">
                                <LuHeart className='icono-like' />
                                <span>234</span>
                            </div>
                        </div>
                    </div>

                    <div className="horarios">
                        <h3>Horarios de Atención</h3>
                        <div className="horarios-lista">
                            <div className="horario-item">
                                <span>Lunes - Viernes</span>
                                <p>6:00 AM - 11:00 PM</p>
                            </div>
                            <div className="horario-item">
                                <span>Sábados - Domingos</span>
                                <p>7:00 AM - 12:00 AM</p>
                            </div>
                        </div>
                    </div>

                    <div className="caracteristicas">
                        <h3>Características</h3>
                        <div className="caracteristicas-grid">
                            <div className="caracteristica">
                                <span className="icono">⚽</span>
                                <span>Césped Sintético</span>
                            </div>
                            <div className="caracteristica">
                                <span className="icono">💡</span>
                                <span>Iluminación LED</span>
                            </div>
                            <div className="caracteristica">
                                <span className="icono">🚿</span>
                                <span>Vestuarios</span>
                            </div>
                            <div className="caracteristica">
                                <span className="icono">🅿️</span>
                                <span>Estacionamiento</span>
                            </div>
                        </div>
                    </div>

                    {/* Ubicacion */}
                    <div className="ubicacion">
                        <h3>Dirección</h3>
                        <p>
                            Calle Principal 123, Colonia Centro, Ciudad de Ejemplo, CP 12345,
                            País de Ejemplo
                        </p>
                    </div>

                    <div className="botones-accion">
                        <button onClick={() => setCalendarsOpen(true)} className="btn-reservar-principal">
                            <RiTimeFill />Reservar Ahora
                        </button>
                        <button className="btn-consultar" onClick={redirectWhatsApp}>
                            <FaWhatsapp />Contáctanos
                        </button>
                    </div>
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
                    {comentarios.map(comentario => (
                        <div key={comentario.id} className="comentario-item">
                            <div className="comentario-header">
                                <div className="usuario-info">
                                    <div className="avatar">
                                        {comentario.usuario.charAt(0)}
                                    </div>
                                    <div className="usuario-detalles">
                                        <h4>{comentario.usuario}</h4>
                                        <span className="fecha">{comentario.fecha}</span>
                                    </div>
                                </div>
                                <div className="calificacion-comentario">
                                    {renderStars(comentario.calificacion)}
                                </div>
                            </div>
                            <p className="comentario-texto">{comentario.comentario}</p>
                        </div>
                    ))}
                </div>

                <div className="agregar-comentario">
                    <h3>Deja tu comentario</h3>
                    <div className="form-comentario">
                        <textarea
                            placeholder="Comparte tu experiencia en este establecimiento..."
                            rows="4"
                        ></textarea>
                        <div className="form-footer">
                            <div className="calificacion-input">
                                <span>Tu calificación:</span>
                                <div className="estrellas-input">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index} className="estrella-input">★</span>
                                    ))}
                                </div>
                            </div>
                            <button className="btn-enviar-comentario">
                                Enviar Comentario
                            </button>
                        </div>
                    </div>
                </div>
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