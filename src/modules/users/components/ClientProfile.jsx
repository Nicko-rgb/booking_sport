import React, { useState } from 'react'
import '../../../styles/Profile/ClientProfile.css'
import EditProfile from './EditProfile.jsx'
import Modal from '../../../shared/components/ui/Modal.jsx'
import userData from '../data/userProfile.js'
import { activeReservations, pendingReservations, reservationHistory, userPreferences } from '../data/reservationsData.js'


const ClientProfile = () => {
    const [activeSection, setActiveSection] = useState('personal')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userInfo, setUserInfo] = useState(userData)

    const menuItems = [
        { id: 'personal', label: 'Datos Personales', active: true },
        { id: 'reservas', label: 'Reservas Activas' },
        { id: 'pendientes', label: 'Reservas por Confirmar' },
        { id: 'historial', label: 'Historial de Reservas' },
        { id: 'configuracion', label: 'Preferencias' }
    ]


    return (
        <div className="profile-container">
            <div className="profile-content">
                {/* Sidebar */}
                <div className="profile-sidebar">
                    {/* User Card */}
                    <div className="user-card">
                        <div className="user-avatar">
                            <span>JM</span>
                        </div>
                        <h3 className="user-name">{userInfo.name}</h3>
                        <p className="member-since">Usuario desde {userInfo.memberSince}</p>

                        {/* Stats */}
                        <div className="user-stats">
                            <div className="stat">
                                <span className="stat-number">{userInfo.totalReservations}</span>
                                <span className="stat-label">Reservas</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{userInfo.lastReservation}</span>
                                <span className="stat-label">Última Reserva</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="profile-nav">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="profile-main">
                    <div className="content-header">
                        <h1>Perfil del Cliente</h1>
                        <p>Consulta y gestiona tu información y actividad en el sistema</p>

                    </div>

                    {/* Personal Information Section */}
                    {activeSection === 'personal' && (
                        <div className="personal-info-section">
                            <div className="section-header">
                                <h2>Datos Personales</h2>
                                <button
                                    className="edit-btn"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Modificar
                                </button>
                            </div>

                            <div className="info-grid">
                                <div className="info-group">
                                    <div className="info-item">
                                        <label>Nombre y Apellido</label>
                                        <span>{userInfo.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Número de Celular</label>
                                        <span>{userInfo.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Dirección</label>
                                        <span>{userInfo.address}</span>
                                    </div>
                                </div>

                                <div className="info-group">
                                    <div className="info-item">
                                        <label>Correo Electrónico</label>
                                        <span>{userInfo.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Fecha de Nacimiento</label>
                                        <span>{userInfo.birthDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Deportes Favoritos</label>
                                        <span>{userInfo.favoritesSports}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reservas Activas Section */}
                    {activeSection === 'reservas' && (
                        <div className="reservations-section">
                            <div className="section-header">
                                <h2>Reservas Activas</h2>
                                <span className="count-badge">{activeReservations.length} reservas</span>
                            </div>
                            <div className="reservations-grid">
                                {activeReservations.map(reservation => (
                                    <div key={reservation.id} className="reservation-card active">
                                        <div className="card-header">
                                            <h3>{reservation.facility}</h3>
                                            <span className={`status-badge ${reservation.status}`}>
                                                {reservation.status === 'confirmada' ? 'Confirmada' : reservation.status}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <div className="reservation-info">
                                                <div className="info-row">
                                                    <span className="icon">🏟️</span>
                                                    <span>{reservation.sport}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">📅</span>
                                                    <span>{reservation.date}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">⏰</span>
                                                    <span>{reservation.time}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">📍</span>
                                                    <span>{reservation.location}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">👥</span>
                                                    <span>{reservation.participants} participantes</span>
                                                </div>
                                                <div className="info-row price">
                                                    <span className="icon">💰</span>
                                                    <span>${reservation.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button className="btn-secondary">Ver Detalles</button>
                                            <button className="btn-danger">Cancelar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reservas Pendientes Section */}
                    {activeSection === 'pendientes' && (
                        <div className="reservations-section">
                            <div className="section-header">
                                <h2>Reservas por Confirmar</h2>
                                <span className="count-badge">{pendingReservations.length} pendientes</span>
                            </div>
                            <div className="reservations-grid">
                                {pendingReservations.map(reservation => (
                                    <div key={reservation.id} className="reservation-card pending">
                                        <div className="card-header">
                                            <h3>{reservation.facility}</h3>
                                            <span className={`status-badge ${reservation.status}`}>
                                                {reservation.status === 'pendiente_pago' ? 'Pendiente Pago' : 'Pendiente Confirmación'}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <div className="reservation-info">
                                                <div className="info-row">
                                                    <span className="icon">🏟️</span>
                                                    <span>{reservation.sport}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">📅</span>
                                                    <span>{reservation.date}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">⏰</span>
                                                    <span>{reservation.time}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">📍</span>
                                                    <span>{reservation.location}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">👥</span>
                                                    <span>{reservation.participants} participantes</span>
                                                </div>
                                                <div className="info-row price">
                                                    <span className="icon">💰</span>
                                                    <span>${reservation.price.toLocaleString()}</span>
                                                </div>
                                                <div className="info-row deadline">
                                                    <span className="icon">⚠️</span>
                                                    <span>Vence: {reservation.deadline}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            {reservation.status === 'pendiente_pago' ? (
                                                <>
                                                    <button className="btn-primary">Pagar Ahora</button>
                                                    <button className="btn-secondary">Ver Detalles</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn-primary">Confirmar</button>
                                                    <button className="btn-secondary">Modificar</button>
                                                </>
                                            )}
                                            <button className="btn-danger">Cancelar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Historial de Reservas Section */}
                    {activeSection === 'historial' && (
                        <div className="reservations-section">
                            <div className="section-header">
                                <h2>Historial de Reservas</h2>
                                <span className="count-badge">{reservationHistory.length} reservas</span>
                            </div>
                            <div className="reservations-grid">
                                {reservationHistory.map(reservation => (
                                    <div key={reservation.id} className={`reservation-card history ${reservation.status}`}>
                                        <div className="card-header">
                                            <h3>{reservation.facility}</h3>
                                            <span className={`status-badge ${reservation.status}`}>
                                                {reservation.status === 'completada' ? 'Completada' : 'Cancelada'}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <div className="reservation-info">
                                                <div className="info-row">
                                                    <span className="icon">🏟️</span>
                                                    <span>{reservation.sport}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">📅</span>
                                                    <span>{reservation.date}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">⏰</span>
                                                    <span>{reservation.time}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">📍</span>
                                                    <span>{reservation.location}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="icon">👥</span>
                                                    <span>{reservation.participants} participantes</span>
                                                </div>
                                                <div className="info-row price">
                                                    <span className="icon">💰</span>
                                                    <span>${reservation.price.toLocaleString()}</span>
                                                </div>
                                                {reservation.rating && (
                                                    <div className="info-row rating">
                                                        <span className="icon">⭐</span>
                                                        <span>{'★'.repeat(reservation.rating)}{'☆'.repeat(5 - reservation.rating)} ({reservation.rating}/5)</span>
                                                    </div>
                                                )}
                                                {reservation.review && (
                                                    <div className="review">
                                                        <p>"{reservation.review}"</p>
                                                    </div>
                                                )}
                                                {reservation.cancelReason && (
                                                    <div className="cancel-reason">
                                                        <span className="icon">❌</span>
                                                        <span>Motivo: {reservation.cancelReason}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button className="btn-secondary">Ver Detalles</button>
                                            {reservation.status === 'completada' && (
                                                <button className="btn-primary">Reservar Nuevamente</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Preferencias Section */}
                    {activeSection === 'configuracion' && (
                        <div className="preferences-section">
                            <div className="section-header">
                                <h2>Preferencias y Configuración</h2>
                            </div>

                            <div className="preferences-grid">
                                {/* Notificaciones */}
                                <div className="preference-card">
                                    <h3>Notificaciones</h3>
                                    <div className="preference-options">
                                        <div className="option-row">
                                            <label>Notificaciones por Email</label>
                                            <input type="checkbox" checked={userPreferences.notifications.email} readOnly />
                                        </div>
                                        <div className="option-row">
                                            <label>Notificaciones por SMS</label>
                                            <input type="checkbox" checked={userPreferences.notifications.sms} readOnly />
                                        </div>
                                        <div className="option-row">
                                            <label>Notificaciones Push</label>
                                            <input type="checkbox" checked={userPreferences.notifications.push} readOnly />
                                        </div>
                                        <div className="option-row">
                                            <label>Recordatorio antes de reserva</label>
                                            <span>{userPreferences.notifications.reminders.beforeReservation}</span>
                                        </div>
                                        <div className="option-row">
                                            <label>Recordatorio de pago</label>
                                            <span>{userPreferences.notifications.reminders.paymentDeadline}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Ubicaciones Favoritas */}
                                <div className="preference-card">
                                    <h3>Ubicaciones Favoritas</h3>
                                    <div className="favorite-locations">
                                        {userPreferences.favoriteLocations.map((location, index) => (
                                            <div key={index} className="location-item">
                                                <span className="icon">📍</span>
                                                <span>{location}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Horarios Preferidos */}
                                <div className="preference-card">
                                    <h3>Horarios Preferidos</h3>
                                    <div className="preferred-times">
                                        {userPreferences.preferredTimes.map((time, index) => (
                                            <div key={index} className="time-item">
                                                <span className="icon">⏰</span>
                                                <span>{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Métodos de Pago */}
                                <div className="preference-card">
                                    <h3>Métodos de Pago</h3>
                                    <div className="payment-methods">
                                        {userPreferences.paymentMethods.map((method) => (
                                            <div key={method.id} className={`payment-item ${method.isDefault ? 'default' : ''}`}>
                                                <div className="payment-info">
                                                    <span className="icon">💳</span>
                                                    <div>
                                                        <span className="payment-type">{method.type}</span>
                                                        <span className="payment-details">{method.brand} •••• {method.last4}</span>
                                                    </div>
                                                </div>
                                                {method.isDefault && <span className="default-badge">Predeterminado</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Privacidad */}
                                <div className="preference-card">
                                    <h3>Configuración de Privacidad</h3>
                                    <div className="preference-options">
                                        <div className="option-row">
                                            <label>Mostrar perfil público</label>
                                            <input type="checkbox" checked={userPreferences.privacy.showProfile} readOnly />
                                        </div>
                                        <div className="option-row">
                                            <label>Compartir estadísticas</label>
                                            <input type="checkbox" checked={userPreferences.privacy.shareStats} readOnly />
                                        </div>
                                        <div className="option-row">
                                            <label>Permitir invitaciones</label>
                                            <input type="checkbox" checked={userPreferences.privacy.allowInvitations} readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="preferences-actions">
                                <button className="btn-primary">Guardar Cambios</button>
                                <button className="btn-secondary">Restablecer</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal para editar perfil */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    // Forzar restauración del scroll
                    setTimeout(() => {
                        document.body.style.overflow = ''
                        document.body.style.paddingRight = ''
                    }, 100)
                }}
                title="Editar Datos Personales"
                size="large"
            >
                <EditProfile
                    onSave={(newData) => {
                        setUserInfo(newData)
                        setIsModalOpen(false)
                        // Forzar restauración del scroll
                        setTimeout(() => {
                            document.body.style.overflow = ''
                            document.body.style.paddingRight = ''
                        }, 100)
                        alert('Datos guardados exitosamente')
                    }}
                    onCancel={() => {
                        setIsModalOpen(false)
                        // Forzar restauración del scroll
                        setTimeout(() => {
                            document.body.style.overflow = ''
                            document.body.style.paddingRight = ''
                        }, 100)
                    }}
                />
            </Modal>
        </div>
    )
}

export default ClientProfile
