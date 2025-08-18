import React, { useState } from 'react';
import '../styles/ReportsAnalytics.css'
import { 
    FiBarChart, 
    FiTrendingUp, 
    FiTrendingDown,
    FiDollarSign,
    FiUsers,
    FiCalendar,
    FiDownload,
    FiFilter,
    FiRefreshCw,
    FiPieChart,
    FiActivity
} from 'react-icons/fi';
import { MdSportsFootball, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';

const ReportsAnalytics = () => {
    // Estados para filtros y configuración
    const [dateRange, setDateRange] = useState('month'); // week, month, quarter, year
    const [selectedCourt, setSelectedCourt] = useState('all');
    const [reportType, setReportType] = useState('revenue'); // revenue, occupancy, clients

    // Datos simulados de canchas
    const courts = [
        { id: 'court1', name: 'Cancha de Fútbol 1', sport: 'Fútbol' },
        { id: 'court2', name: 'Cancha de Fútbol 2', sport: 'Fútbol' },
        { id: 'court3', name: 'Cancha de Tenis 1', sport: 'Tenis' },
        { id: 'court4', name: 'Cancha de Básquet 1', sport: 'Básquet' }
    ];

    // Estadísticas generales
    const generalStats = {
        totalRevenue: 15750000,
        monthlyGrowth: 12.5,
        totalReservations: 342,
        reservationGrowth: 8.3,
        activeClients: 156,
        clientGrowth: 15.2,
        averageOccupancy: 78.5,
        occupancyGrowth: -2.1
    };

    // Datos de ingresos por mes
    const revenueData = [
        { month: 'Ene', revenue: 12500000, reservations: 280 },
        { month: 'Feb', revenue: 13200000, reservations: 295 },
        { month: 'Mar', revenue: 14100000, reservations: 315 },
        { month: 'Abr', revenue: 13800000, reservations: 308 },
        { month: 'May', revenue: 15200000, reservations: 335 },
        { month: 'Jun', revenue: 15750000, reservations: 342 }
    ];

    // Datos de ocupación por cancha
    const occupancyData = [
        { court: 'Fútbol 1', occupancy: 85, hours: 68, sport: 'Fútbol' },
        { court: 'Fútbol 2', occupancy: 82, hours: 65, sport: 'Fútbol' },
        { court: 'Tenis 1', occupancy: 75, hours: 45, sport: 'Tenis' },
        { court: 'Básquet 1', occupancy: 65, hours: 39, sport: 'Básquet' }
    ];

    // Datos de deportes más populares
    const sportsPopularity = [
        { sport: 'Fútbol', percentage: 65, reservations: 223, revenue: 10237500 },
        { sport: 'Tenis', percentage: 25, reservations: 86, revenue: 3870000 },
        { sport: 'Básquet', percentage: 10, reservations: 33, revenue: 1642500 }
    ];

    // Datos de horarios más populares
    const popularTimes = [
        { time: '18:00 - 20:00', reservations: 89, percentage: 26 },
        { time: '20:00 - 22:00', reservations: 76, percentage: 22 },
        { time: '16:00 - 18:00', reservations: 65, percentage: 19 },
        { time: '14:00 - 16:00', reservations: 52, percentage: 15 },
        { time: '10:00 - 12:00', reservations: 38, percentage: 11 },
        { time: '08:00 - 10:00', reservations: 22, percentage: 7 }
    ];

    // Top clientes
    const topClients = [
        { id: 1, name: 'Carlos Rodríguez', reservations: 24, revenue: 960000, sport: 'Fútbol' },
        { id: 2, name: 'Ana García', reservations: 18, revenue: 810000, sport: 'Tenis' },
        { id: 3, name: 'Miguel Torres', reservations: 16, revenue: 640000, sport: 'Fútbol' },
        { id: 4, name: 'Laura Martínez', reservations: 14, revenue: 630000, sport: 'Tenis' },
        { id: 5, name: 'David López', reservations: 12, revenue: 480000, sport: 'Básquet' }
    ];

    // Función para obtener el icono del deporte
    const getSportIcon = (sport) => {
        switch (sport) {
            case 'Fútbol':
                return <MdSportsFootball />;
            case 'Tenis':
                return <MdSportsTennis />;
            case 'Básquet':
                return <MdSportsBasketball />;
            default:
                return <MdSportsFootball />;
        }
    };

    // Función para formatear precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Función para formatear porcentaje
    const formatPercentage = (value, showSign = true) => {
        const sign = showSign && value > 0 ? '+' : '';
        return `${sign}${value.toFixed(1)}%`;
    };

    return (
        <div className="reports-analytics">
            {/* Header */}
            <div className="section-header">
                <div className="header-content">
                    <h1>Reportes y Análisis</h1>
                    <p>Analiza el rendimiento de tu instalación deportiva</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary">
                        <FiRefreshCw />
                        <span>Actualizar</span>
                    </button>
                    <button className="btn-primary">
                        <FiDownload />
                        <span>Exportar Reporte</span>
                    </button>
                </div>
            </div>

            {/* Filtros */}
            <div className="analytics-filters">
                <div className="filter-group">
                    <label>Período</label>
                    <select 
                        value={dateRange} 
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="week">Última semana</option>
                        <option value="month">Último mes</option>
                        <option value="quarter">Último trimestre</option>
                        <option value="year">Último año</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Cancha</label>
                    <select 
                        value={selectedCourt} 
                        onChange={(e) => setSelectedCourt(e.target.value)}
                    >
                        <option value="all">Todas las canchas</option>
                        {courts.map(court => (
                            <option key={court.id} value={court.id}>
                                {court.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Tipo de Reporte</label>
                    <select 
                        value={reportType} 
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="revenue">Ingresos</option>
                        <option value="occupancy">Ocupación</option>
                        <option value="clients">Clientes</option>
                    </select>
                </div>
            </div>

            {/* Estadísticas principales */}
            <div className="main-stats">
                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <FiDollarSign />
                    </div>
                    <div className="stat-content">
                        <h3>{formatPrice(generalStats.totalRevenue)}</h3>
                        <p>Ingresos Totales</p>
                        <span className={`growth ${generalStats.monthlyGrowth > 0 ? 'positive' : 'negative'}`}>
                            {generalStats.monthlyGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {formatPercentage(generalStats.monthlyGrowth)}
                        </span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon reservations">
                        <FiCalendar />
                    </div>
                    <div className="stat-content">
                        <h3>{generalStats.totalReservations}</h3>
                        <p>Reservas Totales</p>
                        <span className={`growth ${generalStats.reservationGrowth > 0 ? 'positive' : 'negative'}`}>
                            {generalStats.reservationGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {formatPercentage(generalStats.reservationGrowth)}
                        </span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon clients">
                        <FiUsers />
                    </div>
                    <div className="stat-content">
                        <h3>{generalStats.activeClients}</h3>
                        <p>Clientes Activos</p>
                        <span className={`growth ${generalStats.clientGrowth > 0 ? 'positive' : 'negative'}`}>
                            {generalStats.clientGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {formatPercentage(generalStats.clientGrowth)}
                        </span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon occupancy">
                        <FiActivity />
                    </div>
                    <div className="stat-content">
                        <h3>{formatPercentage(generalStats.averageOccupancy, false)}</h3>
                        <p>Ocupación Promedio</p>
                        <span className={`growth ${generalStats.occupancyGrowth > 0 ? 'positive' : 'negative'}`}>
                            {generalStats.occupancyGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {formatPercentage(generalStats.occupancyGrowth)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Gráficos y análisis */}
            <div className="analytics-grid">
                {/* Gráfico de ingresos */}
                <div className="analytics-card">
                    <div className="card-header">
                        <h3>Ingresos Mensuales</h3>
                        <FiBarChart className="card-icon" />
                    </div>
                    <div className="chart-container">
                        <div className="revenue-chart">
                            {revenueData.map((data, index) => (
                                <div key={index} className="chart-bar">
                                    <div 
                                        className="bar" 
                                        style={{ height: `${(data.revenue / 16000000) * 100}%` }}
                                    ></div>
                                    <span className="bar-label">{data.month}</span>
                                    <span className="bar-value">{formatPrice(data.revenue)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ocupación por cancha */}
                <div className="analytics-card">
                    <div className="card-header">
                        <h3>Ocupación por Cancha</h3>
                        <FiPieChart className="card-icon" />
                    </div>
                    <div className="occupancy-list">
                        {occupancyData.map((data, index) => (
                            <div key={index} className="occupancy-item">
                                <div className="court-info">
                                    <div className="sport-icon">
                                        {getSportIcon(data.sport)}
                                    </div>
                                    <div className="court-details">
                                        <span className="court-name">{data.court}</span>
                                        <span className="hours">{data.hours}h reservadas</span>
                                    </div>
                                </div>
                                <div className="occupancy-bar">
                                    <div 
                                        className="occupancy-fill" 
                                        style={{ width: `${data.occupancy}%` }}
                                    ></div>
                                </div>
                                <div className="occupancy-percentage">
                                    {data.occupancy}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deportes más populares */}
                <div className="analytics-card">
                    <div className="card-header">
                        <h3>Deportes Más Populares</h3>
                        <FiTrendingUp className="card-icon" />
                    </div>
                    <div className="sports-popularity">
                        {sportsPopularity.map((sport, index) => (
                            <div key={index} className="sport-item">
                                <div className="sport-header">
                                    <div className="sport-info">
                                        <div className="sport-icon">
                                            {getSportIcon(sport.sport)}
                                        </div>
                                        <span className="sport-name">{sport.sport}</span>
                                    </div>
                                    <span className="sport-percentage">{sport.percentage}%</span>
                                </div>
                                <div className="sport-details">
                                    <span>{sport.reservations} reservas</span>
                                    <span>{formatPrice(sport.revenue)}</span>
                                </div>
                                <div className="sport-bar">
                                    <div 
                                        className="sport-fill" 
                                        style={{ width: `${sport.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Horarios más populares */}
                <div className="analytics-card">
                    <div className="card-header">
                        <h3>Horarios Más Populares</h3>
                        <FiActivity className="card-icon" />
                    </div>
                    <div className="popular-times">
                        {popularTimes.map((time, index) => (
                            <div key={index} className="time-item">
                                <div className="time-info">
                                    <span className="time-range">{time.time}</span>
                                    <span className="reservations">{time.reservations} reservas</span>
                                </div>
                                <div className="time-bar">
                                    <div 
                                        className="time-fill" 
                                        style={{ width: `${time.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="time-percentage">{time.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top clientes */}
                <div className="analytics-card">
                    <div className="card-header">
                        <h3>Mejores Clientes</h3>
                        <FiUsers className="card-icon" />
                    </div>
                    <div className="top-clients">
                        {topClients.map((client, index) => (
                            <div key={client.id} className="client-item">
                                <div className="client-rank">
                                    #{index + 1}
                                </div>
                                <div className="client-info">
                                    <span className="client-name">{client.name}</span>
                                    <div className="client-details">
                                        <span>{client.reservations} reservas</span>
                                        <span className="sport">
                                            {getSportIcon(client.sport)}
                                            {client.sport}
                                        </span>
                                    </div>
                                </div>
                                <div className="client-revenue">
                                    {formatPrice(client.revenue)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resumen de rendimiento */}
                <div className="analytics-card full-width">
                    <div className="card-header">
                        <h3>Resumen de Rendimiento</h3>
                        <FiBarChart className="card-icon" />
                    </div>
                    <div className="performance-summary">
                        <div className="summary-grid">
                            <div className="summary-item">
                                <h4>Ingresos por Hora</h4>
                                <p className="summary-value">{formatPrice(46052)}</p>
                                <span className="summary-desc">Promedio por hora reservada</span>
                            </div>
                            <div className="summary-item">
                                <h4>Reservas por Día</h4>
                                <p className="summary-value">11.4</p>
                                <span className="summary-desc">Promedio diario</span>
                            </div>
                            <div className="summary-item">
                                <h4>Tiempo Promedio</h4>
                                <p className="summary-value">2.3h</p>
                                <span className="summary-desc">Duración por reserva</span>
                            </div>
                            <div className="summary-item">
                                <h4>Tasa de Ocupación</h4>
                                <p className="summary-value">78.5%</p>
                                <span className="summary-desc">Promedio general</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="quick-actions">
                <h3>Acciones Rápidas</h3>
                <div className="actions-grid">
                    <button className="action-btn">
                        <FiDownload />
                        <span>Exportar Datos</span>
                        <p>Descargar reporte en Excel</p>
                    </button>
                    <button className="action-btn">
                        <FiFilter />
                        <span>Filtros Avanzados</span>
                        <p>Personalizar análisis</p>
                    </button>
                    <button className="action-btn">
                        <FiCalendar />
                        <span>Programar Reporte</span>
                        <p>Recibir reportes automáticos</p>
                    </button>
                    <button className="action-btn">
                        <FiBarChart />
                        <span>Dashboard Personalizado</span>
                        <p>Crear vista personalizada</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;