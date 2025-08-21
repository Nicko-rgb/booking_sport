import React, { useState } from 'react'
import '../styles/Confirmar.css'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaDollarSign, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa'
import { IoFootball, IoBasketball, IoTennisball } from 'react-icons/io5'
import { MdSports } from 'react-icons/md'

const Confirmar = () => {
    const [pendingReservations, setPendingReservations] = useState([
        {
            id: 1,
            deporte: 'Fútbol',
            cancha: 'Cancha Principal A',
            fecha: '2024-01-26',
            hora: '19:00 - 21:00',
            ubicacion: 'Club Deportivo Sur',
            participantes: 8,
            maxParticipantes: 22,
            precio: 2800,
            fechaLimite: '2024-01-25',
            organizador: 'Carlos Mendez',
            descripcion: 'Partido amistoso de fútbol 11. Se necesitan más jugadores para completar los equipos.'
        },
        {
            id: 2,
            deporte: 'Básquet',
            cancha: 'Cancha Cubierta C',
            fecha: '2024-01-27',
            hora: '21:00 - 23:00',
            ubicacion: 'Polideportivo Este',
            participantes: 6,
            maxParticipantes: 10,
            precio: 2000,
            fechaLimite: '2024-01-26',
            organizador: 'Ana Rodriguez',
            descripcion: 'Entrenamiento de básquet. Nivel intermedio-avanzado.'
        },
        {
            id: 3,
            deporte: 'Tenis',
            cancha: 'Cancha de Tenis 2',
            fecha: '2024-01-29',
            hora: '17:00 - 18:30',
            ubicacion: 'Club de Tenis Premium',
            participantes: 2,
            maxParticipantes: 4,
            precio: 3500,
            fechaLimite: '2024-01-28',
            organizador: 'Miguel Torres',
            descripcion: 'Dobles de tenis. Se buscan jugadores de nivel intermedio.'
        }
    ])

    const getSportIcon = (sport) => {
        switch(sport.toLowerCase()) {
            case 'fútbol': return <IoFootball />;
            case 'básquet': return <IoBasketball />;
            case 'tenis': return <IoTennisball />;
            default: return <MdSports />;
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const getDaysUntilDeadline = (fechaLimite) => {
        const today = new Date();
        const deadline = new Date(fechaLimite);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const handleConfirm = (reservaId) => {
        setPendingReservations(prev => 
            prev.filter(reserva => reserva.id !== reservaId)
        );
        console.log(`Reserva ${reservaId} confirmada`);
    }

    const handleReject = (reservaId) => {
        setPendingReservations(prev => 
            prev.filter(reserva => reserva.id !== reservaId)
        );
        console.log(`Reserva ${reservaId} rechazada`);
    }

    return (
        <div className="confirmar-container">
            <div className="confirmar-header">
                <h3>Reservas por Confirmar</h3>
                <span className="pending-count">{pendingReservations.length} pendientes</span>
            </div>

            {pendingReservations.length > 0 && (
                <div className="urgent-notice">
                    <FaExclamationTriangle className="warning-icon" />
                    <span>Tienes reservas que requieren confirmación urgente</span>
                </div>
            )}

            <div className="pending-grid">
                {pendingReservations.map((reserva) => {
                    const daysLeft = getDaysUntilDeadline(reserva.fechaLimite);
                    const isUrgent = daysLeft <= 1;
                    
                    return (
                        <div key={reserva.id} className={`pending-card ${isUrgent ? 'urgent' : ''}`}>
                            <div className="pending-header">
                                <div className="sport-info">
                                    <div className="sport-icon">
                                        {getSportIcon(reserva.deporte)}
                                    </div>
                                    <div>
                                        <h4>{reserva.deporte}</h4>
                                        <p>{reserva.cancha}</p>
                                    </div>
                                </div>
                                <div className={`deadline-badge ${isUrgent ? 'urgent' : ''}`}>
                                    {daysLeft > 0 ? `${daysLeft} día${daysLeft > 1 ? 's' : ''}` : 'Vence hoy'}
                                </div>
                            </div>

                            <div className="organizer-info">
                                <span>Organizado por: <strong>{reserva.organizador}</strong></span>
                            </div>

                            <div className="reservation-details">
                                <div className="detail-row">
                                    <div className="detail-item">
                                        <FaCalendarAlt className="detail-icon" />
                                        <span>{formatDate(reserva.fecha)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <FaClock className="detail-icon" />
                                        <span>{reserva.hora}</span>
                                    </div>
                                </div>

                                <div className="detail-row">
                                    <div className="detail-item">
                                        <FaMapMarkerAlt className="detail-icon" />
                                        <span>{reserva.ubicacion}</span>
                                    </div>
                                </div>

                                <div className="detail-row">
                                    <div className="detail-item">
                                        <FaUsers className="detail-icon" />
                                        <span>{reserva.participantes}/{reserva.maxParticipantes} jugadores</span>
                                    </div>
                                    <div className="detail-item">
                                        <FaDollarSign className="detail-icon" />
                                        <span>${reserva.precio}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="description">
                                <p>{reserva.descripcion}</p>
                            </div>

                            <div className="confirmation-actions">
                                <button 
                                    className="btn-reject"
                                    onClick={() => handleReject(reserva.id)}
                                >
                                    <FaTimes /> Rechazar
                                </button>
                                <button 
                                    className="btn-confirm"
                                    onClick={() => handleConfirm(reserva.id)}
                                >
                                    <FaCheck /> Confirmar Participación
                                </button>
                            </div>

                            <div className="deadline-info">
                                <span>Confirmar antes del {formatDate(reserva.fechaLimite)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {pendingReservations.length === 0 && (
                <div className="no-pending">
                    <div className="no-pending-icon">
                        <FaCheck />
                    </div>
                    <h4>¡Todo al día!</h4>
                    <p>No tienes reservas pendientes de confirmación</p>
                </div>
            )}
        </div>
    )
}

export default Confirmar