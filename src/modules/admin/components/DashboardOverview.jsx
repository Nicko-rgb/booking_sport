import React from 'react';
import '../styles/DashboardOverview.css'
import { 
    FiCalendar, 
    FiUsers, 
    FiDollarSign, 
    FiTrendingUp,
    FiClock,
    FiMapPin,
    FiStar,
    FiActivity
} from 'react-icons/fi';
import { MdSportsFootball, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';

const DashboardOverview = () => {
    // Datos simulados para las estadísticas
    const stats = [
        {
            id: 1,
            title: 'Reservas Hoy',
            value: '24',
            change: '+12%',
            changeType: 'positive',
            icon: <FiCalendar />,
            color: 'blue'
        },
        {
            id: 2,
            title: 'Ingresos del Mes',
            value: '$15,420',
            change: '+8.5%',
            changeType: 'positive',
            icon: <FiDollarSign />,
            color: 'green'
        },
        {
            id: 3,
            title: 'Clientes Activos',
            value: '342',
            change: '+15%',
            changeType: 'positive',
            icon: <FiUsers />,
            color: 'purple'
        },
        {
            id: 4,
            title: 'Ocupación Promedio',
            value: '78%',
            change: '+3.2%',
            changeType: 'positive',
            icon: <FiTrendingUp />,
            color: 'orange'
        }
    ];

    // Datos simulados para reservas recientes
    const recentReservations = [
        {
            id: 1,
            client: 'Juan Pérez',
            sport: 'Fútbol',
            court: 'Cancha 1',
            time: '14:00 - 15:00',
            date: 'Hoy',
            status: 'confirmada',
            amount: '$25'
        },
        {
            id: 2,
            client: 'María García',
            sport: 'Tenis',
            court: 'Cancha 3',
            time: '16:00 - 17:00',
            date: 'Hoy',
            status: 'pendiente',
            amount: '$30'
        },
        {
            id: 3,
            client: 'Carlos López',
            sport: 'Básquet',
            court: 'Cancha 2',
            time: '18:00 - 19:00',
            date: 'Mañana',
            status: 'confirmada',
            amount: '$35'
        }
    ];

    // Datos simulados para ocupación de canchas
    const courtOccupancy = [
        {
            id: 1,
            name: 'Cancha de Fútbol 1',
            sport: 'Fútbol',
            occupancy: 85,
            status: 'ocupada',
            nextAvailable: '15:00'
        },
        {
            id: 2,
            name: 'Cancha de Tenis 1',
            sport: 'Tenis',
            occupancy: 60,
            status: 'disponible',
            nextAvailable: 'Ahora'
        },
        {
            id: 3,
            name: 'Cancha de Básquet 1',
            sport: 'Básquet',
            occupancy: 90,
            status: 'ocupada',
            nextAvailable: '17:00'
        }
    ];

    return (
        <div className="dashboard-overview">
            {/* Header del dashboard */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Panel de Administración</h1>
                    <p>Resumen general de tu instalación deportiva</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">
                        <FiActivity />
                        <span>Ver Reportes</span>
                    </button>
                </div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                {stats.map((stat) => (
                    <div key={stat.id} className={`stat-card ${stat.color}`}>
                        <div className="stat-icon">
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-title">{stat.title}</p>
                            <div className={`stat-change ${stat.changeType}`}>
                                <FiTrendingUp />
                                <span>{stat.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contenido principal del dashboard */}
            <div className="dashboard-content">
                {/* Reservas recientes */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Reservas Recientes</h2>
                        <button className="btn-secondary">Ver Todas</button>
                    </div>
                    <div className="reservations-list">
                        {recentReservations.map((reservation) => (
                            <div key={reservation.id} className="reservation-item">
                                <div className="reservation-info">
                                    <div className="client-info">
                                        <h4>{reservation.client}</h4>
                                        <p>{reservation.sport} - {reservation.court}</p>
                                    </div>
                                    <div className="reservation-details">
                                        <span className="time">
                                            <FiClock />
                                            {reservation.time}
                                        </span>
                                        <span className="date">{reservation.date}</span>
                                    </div>
                                </div>
                                <div className="reservation-status">
                                    <span className={`status ${reservation.status}`}>
                                        {reservation.status === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                                    </span>
                                    <span className="amount">{reservation.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ocupación de canchas */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Estado de Canchas</h2>
                        <button className="btn-secondary">Gestionar</button>
                    </div>
                    <div className="courts-grid">
                        {courtOccupancy.map((court) => (
                            <div key={court.id} className="court-card">
                                <div className="court-header">
                                    <div className="court-icon">
                                        {court.sport === 'Fútbol' && <MdSportsFootball />}
                                        {court.sport === 'Tenis' && <MdSportsTennis />}
                                        {court.sport === 'Básquet' && <MdSportsBasketball />}
                                    </div>
                                    <div className="court-info">
                                        <h4>{court.name}</h4>
                                        <p>{court.sport}</p>
                                    </div>
                                    <div className={`court-status ${court.status}`}>
                                        {court.status === 'ocupada' ? 'Ocupada' : 'Disponible'}
                                    </div>
                                </div>
                                <div className="court-occupancy">
                                    <div className="occupancy-bar">
                                        <div 
                                            className="occupancy-fill"
                                            style={{ width: `${court.occupancy}%` }}
                                        ></div>
                                    </div>
                                    <span className="occupancy-text">{court.occupancy}% ocupación</span>
                                </div>
                                <div className="court-next">
                                    <FiClock />
                                    <span>Próximo disponible: {court.nextAvailable}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;