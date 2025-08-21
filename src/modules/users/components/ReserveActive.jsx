import React from 'react'
import '../styles/ReserveActive.css'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaDollarSign, FaEye } from 'react-icons/fa'
import { IoFootball, IoBasketball, IoTennisball } from 'react-icons/io5'
import { MdSports } from 'react-icons/md'

const ReserveActive = () => {
    const activeReservations = [
        {
            id: 1,
            deporte: 'Fútbol',
            cancha: 'Cancha Principal A',
            fecha: '2024-01-25',
            hora: '18:00 - 20:00',
            ubicacion: 'Club Deportivo Central',
            participantes: 10,
            maxParticipantes: 22,
            precio: 2500,
            estado: 'confirmada',
        },
        {
            id: 2,
            deporte: 'Básquet',
            cancha: 'Cancha Cubierta B',
            fecha: '2025-01-18',
            hora: '20:00 - 22:00',
            ubicacion: 'Polideportivo Norte',
            participantes: 8,
            maxParticipantes: 10,
            precio: 1800,
            estado: 'confirmada',
        },
        {
            id: 3,
            deporte: 'Tenis',
            cancha: 'Cancha de Tenis 3',
            fecha: '2025-02-02',
            hora: '16:00 - 17:30',
            ubicacion: 'Club de Tenis Elite',
            participantes: 2,
            maxParticipantes: 4,
            precio: 3200,
            estado: 'confirmada',
        },
        {
            id: 3,
            deporte: 'Tenis',
            cancha: 'Cancha de Tenis 3',
            fecha: '2025-10-02',
            hora: '16:00 - 17:30',
            ubicacion: 'Club de Tenis Elite',
            participantes: 2,
            maxParticipantes: 4,
            precio: 3200,
            estado: 'confirmada',
        }
    ]

    const getSportIcon = (sport) => {
        switch (sport.toLowerCase()) {
            case 'fútbol': return <IoFootball />;
            case 'básquet': return <IoBasketball />;
            case 'tenis': return <IoTennisball />;
            default: return <MdSports />;
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const today = new Date().setHours(0, 0, 0, 0)
    const reservasConfirmadas = activeReservations.filter(r => r.estado === 'confirmada')
    const reservasFuturas = reservasConfirmadas.filter(r => new Date(r.fecha) >= today)
    const reservasPasadas = reservasConfirmadas.filter(r => new Date(r.fecha) < today)

    return (
        <div className="reserve-active-container">
            <h4 className="title_profile">Reservas Confirmadas</h4>

            {/* Futuras */}
            <section className="reserves-section">
                <h5 className="reserves-subtitle">Próximas</h5>
                <div className="reserves-grid">
                    {reservasFuturas.length > 0 ? reservasFuturas.map((reserva) => (
                        <div key={reserva.id} className="reserve-card">
                            <div className="reserve-header">
                                <div className="sport-info">
                                    <div className="sport-icon">
                                        {getSportIcon(reserva.deporte)}
                                    </div>
                                    <div>
                                        <h4>{reserva.deporte}</h4>
                                        <p>{reserva.cancha}</p>
                                    </div>
                                </div>
                                <div className="status-badge status-confirmed">Confirmada</div>
                            </div>

                            <div className="reserve-details">
                                <div className="detail-item">
                                    <FaCalendarAlt className="detail-icon" />
                                    <div>
                                        <label>Fecha</label>
                                        <span>{formatDate(reserva.fecha)}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaClock className="detail-icon" />
                                    <div>
                                        <label>Horario</label>
                                        <span>{reserva.hora}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaMapMarkerAlt className="detail-icon" />
                                    <div>
                                        <label>Ubicación</label>
                                        <span>{reserva.ubicacion}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaUsers className="detail-icon" />
                                    <div>
                                        <label>Participantes</label>
                                        <span>{reserva.participantes}/{reserva.maxParticipantes}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaDollarSign className="detail-icon" />
                                    <div>
                                        <label>Precio</label>
                                        <span>${reserva.precio}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="reserve-actions">
                                <button className="btn-view">
                                    <FaEye /> Ver Detalles
                                </button>
                            </div>
                        </div>
                    )) : <p className="empty-msg">No tienes reservas próximas.</p>}
                </div>
            </section>

            {/* Pasadas */}
            <section className="reserves-section">
                <h5 className="reserves-subtitle">Pasadas</h5>
                <div className="reserves-grid">
                    {reservasPasadas.length > 0 ? reservasPasadas.map((reserva) => (
                        <div key={reserva.id} className="reserve-card past">
                            <div className="reserve-header">
                                <div className="sport-info">
                                    <div className="sport-icon">
                                        {getSportIcon(reserva.deporte)}
                                    </div>
                                    <div>
                                        <h4>{reserva.deporte}</h4>
                                        <p>{reserva.cancha}</p>
                                    </div>
                                </div>
                                <div className="status-badge status-confirmed">Completada</div>
                            </div>

                            <div className="reserve-details">
                                <div className="detail-item">
                                    <FaCalendarAlt className="detail-icon" />
                                    <div>
                                        <label>Fecha</label>
                                        <span>{formatDate(reserva.fecha)}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <FaClock className="detail-icon" />
                                    <div>
                                        <label>Horario</label>
                                        <span>{reserva.hora}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : <p className="empty-msg">No tienes reservas pasadas.</p>}
                </div>
            </section>
        </div>
    )
}

export default ReserveActive
