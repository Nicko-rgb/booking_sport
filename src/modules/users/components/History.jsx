import React, { useState } from 'react'
import '../styles/History.css'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaDollarSign, FaFilter, FaSearch, FaCheckCircle, FaTimesCircle, FaClock as FaClockIcon } from 'react-icons/fa'
import { IoFootball, IoBasketball, IoTennisball } from 'react-icons/io5'
import { MdSports } from 'react-icons/md'

const History = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('todos')
    const [filterSport, setFilterSport] = useState('todos')

    const historyReservations = [
        {
            id: 1,
            deporte: 'Fútbol',
            cancha: 'Cancha Principal A',
            fecha: '2024-01-15',
            hora: '18:00 - 20:00',
            ubicacion: 'Club Deportivo Central',
            participantes: 22,
            maxParticipantes: 22,
            precio: 2500,
            estado: 'completada',
            fechaReserva: '2024-01-10'
        },
        {
            id: 2,
            deporte: 'Básquet',
            cancha: 'Cancha Cubierta B',
            fecha: '2024-01-12',
            hora: '20:00 - 22:00',
            ubicacion: 'Polideportivo Norte',
            participantes: 10,
            maxParticipantes: 10,
            precio: 1800,
            estado: 'completada',
            fechaReserva: '2024-01-08'
        },
        {
            id: 3,
            deporte: 'Tenis',
            cancha: 'Cancha de Tenis 3',
            fecha: '2024-01-10',
            hora: '16:00 - 17:30',
            ubicacion: 'Club de Tenis Elite',
            participantes: 4,
            maxParticipantes: 4,
            precio: 3200,
            estado: 'completada',
            fechaReserva: '2024-01-05'
        },
        {
            id: 4,
            deporte: 'Fútbol',
            cancha: 'Cancha Secundaria C',
            fecha: '2024-01-08',
            hora: '19:00 - 21:00',
            ubicacion: 'Club Deportivo Sur',
            participantes: 12,
            maxParticipantes: 22,
            precio: 2200,
            estado: 'cancelada',
            fechaReserva: '2024-01-03'
        },
        {
            id: 5,
            deporte: 'Básquet',
            cancha: 'Cancha Exterior D',
            fecha: '2024-01-05',
            hora: '17:00 - 19:00',
            ubicacion: 'Polideportivo Este',
            participantes: 8,
            maxParticipantes: 10,
            precio: 1500,
            estado: 'no_asistio',
            fechaReserva: '2024-01-01'
        }
    ]

    const getSportIcon = (sport) => {
        switch(sport.toLowerCase()) {
            case 'fútbol': return <IoFootball />;
            case 'básquet': return <IoBasketball />;
            case 'tenis': return <IoTennisball />;
            default: return <MdSports />;
        }
    }

    const getStatusInfo = (estado) => {
        switch(estado) {
            case 'completada':
                return { icon: <FaCheckCircle />, color: '#4ec452', text: 'Completada' };
            case 'cancelada':
                return { icon: <FaTimesCircle />, color: '#f44336', text: 'Cancelada' };
            case 'no_asistio':
                return { icon: <FaClockIcon />, color: '#ff9800', text: 'No asistió' };
            default:
                return { icon: <FaClockIcon />, color: '#757575', text: 'Desconocido' };
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const filteredReservations = historyReservations.filter(reserva => {
        const matchesSearch = reserva.deporte.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            reserva.cancha.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            reserva.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === 'todos' || reserva.estado === filterStatus;
        const matchesSport = filterSport === 'todos' || reserva.deporte.toLowerCase() === filterSport.toLowerCase();
        
        return matchesSearch && matchesStatus && matchesSport;
    });

    const getStats = () => {
        const total = historyReservations.length;
        const completadas = historyReservations.filter(r => r.estado === 'completada').length;
        const canceladas = historyReservations.filter(r => r.estado === 'cancelada').length;
        const totalGastado = historyReservations
            .filter(r => r.estado === 'completada')
            .reduce((sum, r) => sum + r.precio, 0);
        
        return { total, completadas, canceladas, totalGastado };
    }

    const stats = getStats();

    return (
        <div className="history-container">
            <div className="history-header">
                <h3>Historial de Reservas</h3>
                <div className="history-stats">
                    <div className="stat-item">
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.completadas}</span>
                        <span className="stat-label">Completadas</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">${stats.totalGastado}</span>
                        <span className="stat-label">Gastado</span>
                    </div>
                </div>
            </div>

            <div className="history-filters">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por deporte, cancha o ubicación..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="filter-group">
                    <div className="filter-item">
                        <FaFilter className="filter-icon" />
                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="todos">Todos los estados</option>
                            <option value="completada">Completadas</option>
                            <option value="cancelada">Canceladas</option>
                            <option value="no_asistio">No asistió</option>
                        </select>
                    </div>
                    
                    <div className="filter-item">
                        <select 
                            value={filterSport} 
                            onChange={(e) => setFilterSport(e.target.value)}
                        >
                            <option value="todos">Todos los deportes</option>
                            <option value="fútbol">Fútbol</option>
                            <option value="básquet">Básquet</option>
                            <option value="tenis">Tenis</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="history-list">
                {filteredReservations.map((reserva) => {
                    const statusInfo = getStatusInfo(reserva.estado);
                    
                    return (
                        <div key={reserva.id} className={`history-card ${reserva.estado}`}>
                            <div className="history-card-header">
                                <div className="sport-info">
                                    <div className="sport-icon">
                                        {getSportIcon(reserva.deporte)}
                                    </div>
                                    <div>
                                        <h4>{reserva.deporte}</h4>
                                        <p>{reserva.cancha}</p>
                                    </div>
                                </div>
                                <div 
                                    className="status-indicator"
                                    style={{ color: statusInfo.color }}
                                >
                                    {statusInfo.icon}
                                    <span>{statusInfo.text}</span>
                                </div>
                            </div>

                            <div className="history-details">
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

                            <div className="reservation-date">
                                <span>Reservado el {formatDate(reserva.fechaReserva)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {filteredReservations.length === 0 && (
                <div className="no-history">
                    <div className="no-history-icon">
                        <FaCalendarAlt />
                    </div>
                    <h4>No se encontraron reservas</h4>
                    <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
            )}
        </div>
    )
}

export default History