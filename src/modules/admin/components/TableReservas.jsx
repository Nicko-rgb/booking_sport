import React, { useState } from 'react';
import '../styles/TableReservas.css'
import { FiCalendar, FiClock, FiEdit, FiTrash2, FiCheck, FiX, FiEye, FiDownload } from 'react-icons/fi';
import { MdSportsFootball, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';
import SequentialSlideIn from '../../../shared/components/ui/SequentialSlideIn';
import { LuListTodo } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

const TableReservas = () => {

    // Datos simulados de reservas
    const reservations = [
        {
            id: 'RES001',
            client: {
                name: 'Juan Pérez',
                email: 'juan.perez@email.com',
                phone: '+57 300 123 4567'
            },
            sport: 'Fútbol',
            court: 'Cancha de Fútbol 1',
            date: '2024-01-15',
            time: '14:00 - 15:00',
            duration: 60,
            price: 25000,
            status: 'confirmada',
            paymentStatus: 'pagado',
            createdAt: '2024-01-10 09:30'
        },
        {
            id: 'RES002',
            client: {
                name: 'María García',
                email: 'maria.garcia@email.com',
                phone: '+57 301 234 5678'
            },
            sport: 'Tenis',
            court: 'Cancha de Tenis 1',
            date: '2024-01-15',
            time: '16:00 - 17:00',
            duration: 60,
            price: 30000,
            status: 'pendiente',
            paymentStatus: 'pendiente',
            createdAt: '2024-01-12 14:20'
        },
        {
            id: 'RES003',
            client: {
                name: 'Carlos López',
                email: 'carlos.lopez@email.com',
                phone: '+57 302 345 6789'
            },
            sport: 'Básquet',
            court: 'Cancha de Básquet 1',
            date: '2024-01-16',
            time: '18:00 - 19:00',
            duration: 60,
            price: 35000,
            status: 'confirmada',
            paymentStatus: 'pagado',
            createdAt: '2024-01-11 16:45'
        },
        {
            id: 'RES004',
            client: {
                name: 'Ana Rodríguez',
                email: 'ana.rodriguez@email.com',
                phone: '+57 303 456 7890'
            },
            sport: 'Fútbol',
            court: 'Cancha de Fútbol 2',
            date: '2024-01-15',
            time: '20:00 - 21:00',
            duration: 60,
            price: 25000,
            status: 'cancelada',
            paymentStatus: 'reembolsado',
            createdAt: '2024-01-09 11:15'
        }
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

    return (
        <div className="table_reservas">
            {/* Header */}
            <section className="section-header">
                <div className="header-content">
                    <h1>Gestión de Reservas</h1>
                    <p>Administra todas las reservas de tu instalación deportiva</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary"><FiDownload />Exportar</button>
                    <button className="btn-primary"><FiCalendar />Nueva Reserva</button>
                </div>
            </section>

            {/* Estadísticas rápidas */}
            <SequentialSlideIn delay={200} duration={600} className='quick-stats' startDelay={300}>
                <div className="stat-item">
                    <span className="stat-number">24</span>
                    <span className="stat-label">Reservas Hoy</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">18</span>
                    <span className="stat-label">Confirmadas</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Pendientes</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">2</span>
                    <span className="stat-label">Canceladas</span>
                </div>
            </SequentialSlideIn>

            {/* Tabla de reservas */}
            <SequentialSlideIn startDelay={600} className='reservations-table'>
                <div className="table-header">
                    <h3><LuListTodo /> Lista de Reservas</h3>
                    <span className="results-count">{reservations.length} reservas encontradas</span>
                    <div></div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Deporte/Cancha</th>
                            <th>Fecha y Hora</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td className='reservation-id'>{reservation.id}</td>
                                <td>
                                    <div className="client-info">
                                        <FaUser className="client-avatar" />
                                        <div className="client-details">
                                            <span className="client-name">{reservation.client.name}</span>
                                            <span className="client-email">{reservation.client.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="sport-info">
                                        <div className="sport-icon">
                                            {getSportIcon(reservation.sport)}
                                        </div>
                                        <div className="sport-details">
                                            <span className="sport-name">{reservation.sport}</span>
                                            <span className="court-name">{reservation.court}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="datetime-info">
                                        <span className="date">
                                            <FiCalendar />
                                            {reservation.date}
                                        </span>
                                        <span className="time">
                                            <FiClock />
                                            {reservation.time}
                                        </span>
                                    </div>
                                </td>
                                <td className='price'>{formatPrice(reservation.price)}</td>
                                <td>
                                    <span className={`status ${reservation.status}`}>
                                        {reservation.status === 'confirmada' && <FiCheck />}
                                        {reservation.status === 'pendiente' && <FiClock />}
                                        {reservation.status === 'cancelada' && <FiX />}
                                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <span className={`payment-status ${reservation.paymentStatus}`}>
                                        {reservation.paymentStatus === 'pagado' ? 'Pagado' :
                                            reservation.paymentStatus === 'pendiente' ? 'Pendiente' : 'Reembolsado'}
                                    </span>
                                </td>
                                <td className='acc'>
                                    <div className="actions">
                                        <button className="action-btn view" title="Ver detalles">
                                            <FiEye />
                                        </button>
                                        <button className="action-btn edit" title="Editar">
                                            <FiEdit />
                                        </button>
                                        <button className="action-btn delete" title="Cancelar">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
                <div className="pagination">
                    <button className="pagination-btn" disabled>
                        Anterior
                    </button>
                    <div className="pagination-info">
                        <span>Página 1 de 1</span>
                    </div>
                    <button className="pagination-btn" disabled>
                        Siguiente
                    </button>
                </div>
            </SequentialSlideIn>
        </div>
    );
};

export default TableReservas;