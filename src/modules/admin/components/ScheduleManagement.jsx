import React, { useState } from 'react';
import '../styles/ScheduleManagement.css'
import {
    FiClock,
    FiCalendar,
    FiPlus,
    FiEdit,
    FiTrash2,
    FiSave,
    FiX,
    FiCopy,
    FiSettings
} from 'react-icons/fi';
import { MdSportsFootball, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';

const ScheduleManagement = () => {
    // Estados para la gestión de horarios
    const [selectedCourt, setSelectedCourt] = useState('all');
    const [selectedDay, setSelectedDay] = useState('monday');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);

    // Datos simulados de canchas
    const courts = [
        {
            id: 'court1',
            name: 'Cancha de Fútbol 1',
            sport: 'Fútbol',
            capacity: 22,
            status: 'active'
        },
        {
            id: 'court2',
            name: 'Cancha de Fútbol 2',
            sport: 'Fútbol',
            capacity: 22,
            status: 'active'
        },
        {
            id: 'court3',
            name: 'Cancha de Tenis 1',
            sport: 'Tenis',
            capacity: 4,
            status: 'active'
        },
        {
            id: 'court4',
            name: 'Cancha de Básquet 1',
            sport: 'Básquet',
            capacity: 10,
            status: 'maintenance'
        }
    ];

    // Días de la semana
    const daysOfWeek = [
        { id: 'monday', name: 'Lunes', short: 'Lun' },
        { id: 'tuesday', name: 'Martes', short: 'Mar' },
        { id: 'wednesday', name: 'Miércoles', short: 'Mié' },
        { id: 'thursday', name: 'Jueves', short: 'Jue' },
        { id: 'friday', name: 'Viernes', short: 'Vie' },
        { id: 'saturday', name: 'Sábado', short: 'Sáb' },
        { id: 'sunday', name: 'Domingo', short: 'Dom' }
    ];

    // Datos simulados de horarios
    const schedules = {
        court1: {
            monday: [
                { id: 1, startTime: '06:00', endTime: '08:00', price: 20000, available: true },
                { id: 2, startTime: '08:00', endTime: '10:00', price: 25000, available: true },
                { id: 3, startTime: '10:00', endTime: '12:00', price: 25000, available: true },
                { id: 4, startTime: '14:00', endTime: '16:00', price: 30000, available: true },
                { id: 5, startTime: '16:00', endTime: '18:00', price: 35000, available: true },
                { id: 6, startTime: '18:00', endTime: '20:00', price: 40000, available: true },
                { id: 7, startTime: '20:00', endTime: '22:00', price: 35000, available: true }
            ],
            tuesday: [
                { id: 8, startTime: '06:00', endTime: '08:00', price: 20000, available: true },
                { id: 9, startTime: '08:00', endTime: '10:00', price: 25000, available: false },
                { id: 10, startTime: '14:00', endTime: '16:00', price: 30000, available: true }
            ]
        },
        court3: {
            monday: [
                { id: 11, startTime: '07:00', endTime: '08:00', price: 25000, available: true },
                { id: 12, startTime: '08:00', endTime: '09:00', price: 30000, available: true },
                { id: 13, startTime: '17:00', endTime: '18:00', price: 35000, available: true },
                { id: 14, startTime: '18:00', endTime: '19:00', price: 40000, available: true }
            ]
        }
    };

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

    // Función para obtener horarios del día seleccionado
    const getCurrentSchedules = () => {
        if (selectedCourt === 'all') {
            // Mostrar horarios de todas las canchas
            const allSchedules = [];
            Object.keys(schedules).forEach(courtId => {
                const court = courts.find(c => c.id === courtId);
                const daySchedules = schedules[courtId][selectedDay] || [];
                daySchedules.forEach(schedule => {
                    allSchedules.push({
                        ...schedule,
                        courtId,
                        courtName: court?.name,
                        sport: court?.sport
                    });
                });
            });
            return allSchedules.sort((a, b) => a.startTime.localeCompare(b.startTime));
        } else {
            const daySchedules = schedules[selectedCourt]?.[selectedDay] || [];
            const court = courts.find(c => c.id === selectedCourt);
            return daySchedules.map(schedule => ({
                ...schedule,
                courtId: selectedCourt,
                courtName: court?.name,
                sport: court?.sport
            }));
        }
    };

    return (
        <div className="schedule-management">
            {/* Header */}
            <div className="section-header">
                <div className="header-content">
                    <h1>Gestión de Horarios</h1>
                    <p>Configura los horarios y precios de tus canchas deportivas</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary">
                        <FiCopy />
                        <span>Copiar Horarios</span>
                    </button>
                    <button
                        className="btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FiPlus />
                        <span>Nuevo Horario</span>
                    </button>
                </div>
            </div>

            {/* Filtros */}
            <div className="schedule-filters">
                <div className="filter-group">
                    <label>Cancha</label>
                    <select
                        value={selectedCourt}
                        onChange={(e) => setSelectedCourt(e.target.value)}
                    >
                        <option value="all">Todas las canchas</option>
                        {courts.map(court => (
                            <option key={court.id} value={court.id}>
                                {court.name} ({court.sport})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="days-selector">
                    {daysOfWeek.map(day => (
                        <button
                            key={day.id}
                            className={`day-btn ${selectedDay === day.id ? 'active' : ''}`}
                            onClick={() => setSelectedDay(day.id)}
                        >
                            <span className="day-full">{day.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Resumen de canchas */}
            <div className="courts-summary">
                {courts.map(court => (
                    <aside key={court.id} className={`court-summary ${court.status}`}>
                        <div className="court-header">
                            <div className="court-icon">{getSportIcon(court.sport)}</div>
                            <h4>{court.name}</h4>
                        </div>
                        <p className="court-info">{court.sport} • Capacidad: {court.capacity} personas</p>
                        <div className="court-status">
                            <span className="court-schedules-count">{schedules[court.id]?.[selectedDay]?.length || 0} horarios</span>
                            <span className={`status ${court.status}`}>{court.status === 'active' ? 'Activa' : 'Mantenimiento'}</span>
                        </div>
                    </aside>
                ))}
            </div>

            {/* Horarios del día */}
            <div className="schedules-section">
                <div className="section-title">
                    <h3>Horarios para {daysOfWeek.find(d => d.id === selectedDay)?.name}</h3>
                    <span className="schedules-count">
                        {getCurrentSchedules().length} horarios configurados
                    </span>
                </div>

                <div className="schedules-grid">
                    {getCurrentSchedules().map(schedule => (
                        <div key={`${schedule.courtId}-${schedule.id}`} className="schedule-card">
                            <div className="schedule-header">
                                <div className="time-range">
                                    <FiClock />
                                    <span>{schedule.startTime} - {schedule.endTime}</span>
                                </div>
                                <div className="schedule-actions">
                                    <button
                                        className="action-btn edit"
                                        onClick={() => setEditingSchedule(schedule)}
                                    >
                                        <FiEdit />
                                    </button>
                                    <button className="action-btn delete">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>

                            <div className="schedule-content">
                                <div className="court-info">
                                    <div className="sport-icon">
                                        {getSportIcon(schedule.sport)}
                                    </div>
                                    <div className="court-details">
                                        <span className="court-name">{schedule.courtName}</span>
                                        <span className="sport-name">{schedule.sport}</span>
                                    </div>
                                </div>

                                <div className="schedule-details">
                                    <div className="price">
                                        <span className="price-label">Precio:</span>
                                        <span className="price-value">{formatPrice(schedule.price)}</span>
                                    </div>
                                    <div className="availability">
                                        <span className={`availability-status ${schedule.available ? 'available' : 'unavailable'}`}>
                                            {schedule.available ? 'Disponible' : 'No disponible'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {getCurrentSchedules().length === 0 && (
                        <div className="no-schedules">
                            <FiClock className="no-schedules-icon" />
                            <h4>No hay horarios configurados</h4>
                            <p>Agrega horarios para {daysOfWeek.find(d => d.id === selectedDay)?.name}</p>
                            <button
                                className="btn-primary"
                                onClick={() => setShowAddModal(true)}
                            >
                                <FiPlus />
                                Agregar Horario
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Configuración rápida */}
            <div className="quick-config">
                <h3>Configuración Rápida</h3>
                <div className="quick-actions">
                    <button className="quick-action-btn">
                        <FiSettings />
                        <span>Horarios por Defecto</span>
                        <p>Configurar horarios estándar para todas las canchas</p>
                    </button>
                    <button className="quick-action-btn">
                        <FiCopy />
                        <span>Copiar Semana</span>
                        <p>Duplicar horarios de una semana a otra</p>
                    </button>
                    <button className="quick-action-btn">
                        <FiCalendar />
                        <span>Horarios Especiales</span>
                        <p>Configurar horarios para días festivos</p>
                    </button>
                </div>
            </div>

            {/* Modal para agregar/editar horario */}
            {(showAddModal || editingSchedule) && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{editingSchedule ? 'Editar Horario' : 'Nuevo Horario'}</h3>
                            <button
                                className="modal-close"
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingSchedule(null);
                                }}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Cancha</label>
                                <select defaultValue={editingSchedule?.courtId || ''}>
                                    {courts.map(court => (
                                        <option key={court.id} value={court.id}>
                                            {court.name} ({court.sport})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Hora de Inicio</label>
                                    <input
                                        type="time"
                                        defaultValue={editingSchedule?.startTime || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hora de Fin</label>
                                    <input
                                        type="time"
                                        defaultValue={editingSchedule?.endTime || ''}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    placeholder="Precio en COP"
                                    defaultValue={editingSchedule?.price || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        defaultChecked={editingSchedule?.available ?? true}
                                    />
                                    <span>Disponible para reservas</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingSchedule(null);
                                }}
                            >
                                Cancelar
                            </button>
                            <button className="btn-primary">
                                <FiSave />
                                {editingSchedule ? 'Guardar Cambios' : 'Crear Horario'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleManagement;