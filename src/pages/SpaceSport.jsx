import React, { useState } from 'react';
import '../styles/spaceSport.css';
import { LuHeart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { RiTimeFill } from "react-icons/ri";
import Calendars from '../components/SpaceSport/Calendars';

const Establecimiento = () => {
    const [calendarsOpen, setCalendarsOpen] = useState(false);
    const [imagenPrincipal, setImagenPrincipal] = useState('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop');

    const imagenesGaleria = [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop'
    ];

    const comentarios = [
        {
            id: 1,
            usuario: 'Carlos Mendoza',
            calificacion: 5,
            comentario: 'Excelente cancha, muy bien mantenida y con buenas instalaciones.',
            fecha: '2024-01-15'
        },
        {
            id: 2,
            usuario: 'María González',
            calificacion: 4,
            comentario: 'Muy buen lugar para jugar fútbol. El césped está en perfectas condiciones.',
            fecha: '2024-01-10'
        },
        {
            id: 3,
            usuario: 'Luis Rodríguez',
            calificacion: 5,
            comentario: 'Instalaciones modernas y personal muy amable. Totalmente recomendado.',
            fecha: '2024-01-08'
        }
    ];

    const renderEstrellas = (calificacion) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} className={`estrella ${index < calificacion ? 'activa' : ''}`} />
        ));
    };

    return (
        <div className="space-sport">
            <div className="contenido-principal">
                {/* Sección de imágenes */}
                <div className="seccion-imagenes">
                    <div className="imagen-principal">
                        <img src={imagenPrincipal} alt="Cancha principal" />
                    </div>
                    <div className="galeria-imagenes">
                        {imagenesGaleria.map((imagen, index) => (
                            <div
                                key={index}
                                className={`imagen-miniatura ${imagen === imagenPrincipal ? 'activa' : ''}`}
                                onClick={() => setImagenPrincipal(imagen)}
                            >
                                <img src={imagen} alt={`Vista ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="descripcion">
                        <h3>Descripción</h3>
                        <p>
                            Cancha de fútbol profesional con césped sintético de última generación.
                            Perfecta para partidos de fútbol 11, entrenamientos y eventos deportivos.
                            Cuenta con iluminación LED, vestuarios equipados, estacionamiento y
                            área de espectadores techada.
                        </p>
                    </div>
                </div>

                {/* Información del establecimiento */}
                <div className="info-establecimiento">
                    <div className="header-info">
                        <h1>Cancha de Fútbol "El Verde"</h1>
                        <div className="calificacion-likes">
                            <div className="calificacion">
                                {renderEstrellas(4)}
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

                    <div className="botones-accion">
                        <button onClick={() => setCalendarsOpen(true)} className="btn-reservar-principal">
                            <RiTimeFill />Reservar Ahora
                        </button>
                        <button className="btn-consultar">
                            Consultar Disponibilidad
                        </button>
                    </div>
                </div>
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
                                    {renderEstrellas(comentario.calificacion)}
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
            />
        </div>
    );
};

export default Establecimiento;