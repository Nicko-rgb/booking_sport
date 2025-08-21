import React, { useState } from 'react'
import '../styles/Preferences.css'
import { FaBell, FaEnvelope, FaMobile, FaEye, FaEyeSlash, FaGlobe, FaPalette, FaShieldAlt, FaCreditCard, FaCalendarAlt, FaMapMarkerAlt, FaSave, FaUndo } from 'react-icons/fa'
import { IoFootball, IoBasketball, IoTennisball } from 'react-icons/io5'
import { MdSports, MdNotifications, MdSecurity, MdLanguage } from 'react-icons/md'

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        notifications: {
            email: true,
            push: true,
            sms: false,
            reservationReminders: true,
            promotions: false,
            weeklyReport: true
        },
        privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false,
            allowMessages: true
        },
        display: {
            language: 'es',
            theme: 'light',
            dateFormat: 'dd/mm/yyyy',
            timeFormat: '24h'
        },
        sports: {
            favoriteCategories: ['Fútbol', 'Básquet'],
            skillLevel: 'intermedio',
            preferredTimes: ['evening'],
            maxDistance: 10
        },
        payment: {
            defaultMethod: 'credit_card',
            autoPayment: false,
            savePaymentInfo: true
        }
    })

    const [hasChanges, setHasChanges] = useState(false)

    const handlePreferenceChange = (category, key, value) => {
        setPreferences(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }))
        setHasChanges(true)
    }

    const handleArrayChange = (category, key, value, isChecked) => {
        setPreferences(prev => {
            const currentArray = prev[category][key]
            let newArray
            
            if (isChecked) {
                newArray = [...currentArray, value]
            } else {
                newArray = currentArray.filter(item => item !== value)
            }
            
            return {
                ...prev,
                [category]: {
                    ...prev[category],
                    [key]: newArray
                }
            }
        })
        setHasChanges(true)
    }

    const handleSave = () => {
        // Aquí se guardarían las preferencias
        console.log('Guardando preferencias:', preferences)
        setHasChanges(false)
        alert('Preferencias guardadas exitosamente')
    }

    const handleReset = () => {
        // Resetear a valores por defecto
        setPreferences({
            notifications: {
                email: true,
                push: true,
                sms: false,
                reservationReminders: true,
                promotions: false,
                weeklyReport: true
            },
            privacy: {
                profileVisibility: 'public',
                showEmail: false,
                showPhone: false,
                allowMessages: true
            },
            display: {
                language: 'es',
                theme: 'light',
                dateFormat: 'dd/mm/yyyy',
                timeFormat: '24h'
            },
            sports: {
                favoriteCategories: ['Fútbol', 'Básquet'],
                skillLevel: 'intermedio',
                preferredTimes: ['evening'],
                maxDistance: 10
            },
            payment: {
                defaultMethod: 'credit_card',
                autoPayment: false,
                savePaymentInfo: true
            }
        })
        setHasChanges(false)
    }

    const getSportIcon = (sport) => {
        switch(sport.toLowerCase()) {
            case 'fútbol': return <IoFootball />;
            case 'básquet': return <IoBasketball />;
            case 'tenis': return <IoTennisball />;
            default: return <MdSports />;
        }
    }

    return (
        <div className="preferences-container">
            <div className="preferences-header">
                <h3>Configuraciones</h3>
                <p>Personaliza tu experiencia en la aplicación</p>
            </div>

            <div className="preferences-content">
                {/* Notificaciones */}
                <div className="preference-section">
                    <div className="section-header">
                        <MdNotifications className="section-icon" />
                        <h4>Notificaciones</h4>
                    </div>
                    
                    <div className="preference-group">
                        <div className="preference-item">
                            <div className="preference-info">
                                <FaEnvelope className="preference-icon" />
                                <div>
                                    <span className="preference-title">Notificaciones por email</span>
                                    <p className="preference-description">Recibe actualizaciones por correo electrónico</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.notifications.email}
                                    onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaBell className="preference-icon" />
                                <div>
                                    <span className="preference-title">Notificaciones push</span>
                                    <p className="preference-description">Recibe notificaciones en tiempo real</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.notifications.push}
                                    onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaMobile className="preference-icon" />
                                <div>
                                    <span className="preference-title">SMS</span>
                                    <p className="preference-description">Recibe mensajes de texto importantes</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.notifications.sms}
                                    onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaCalendarAlt className="preference-icon" />
                                <div>
                                    <span className="preference-title">Recordatorios de reservas</span>
                                    <p className="preference-description">Te recordamos tus próximas reservas</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.notifications.reservationReminders}
                                    onChange={(e) => handlePreferenceChange('notifications', 'reservationReminders', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Privacidad */}
                <div className="preference-section">
                    <div className="section-header">
                        <MdSecurity className="section-icon" />
                        <h4>Privacidad</h4>
                    </div>
                    
                    <div className="preference-group">
                        <div className="preference-item">
                            <div className="preference-info">
                                <FaEye className="preference-icon" />
                                <div>
                                    <span className="preference-title">Visibilidad del perfil</span>
                                    <p className="preference-description">Controla quién puede ver tu perfil</p>
                                </div>
                            </div>
                            <select 
                                value={preferences.privacy.profileVisibility}
                                onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
                                className="preference-select"
                            >
                                <option value="public">Público</option>
                                <option value="friends">Solo amigos</option>
                                <option value="private">Privado</option>
                            </select>
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaEnvelope className="preference-icon" />
                                <div>
                                    <span className="preference-title">Mostrar email</span>
                                    <p className="preference-description">Permite que otros vean tu email</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.privacy.showEmail}
                                    onChange={(e) => handlePreferenceChange('privacy', 'showEmail', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Configuración de pantalla */}
                <div className="preference-section">
                    <div className="section-header">
                        <FaPalette className="section-icon" />
                        <h4>Pantalla</h4>
                    </div>
                    
                    <div className="preference-group">
                        <div className="preference-item">
                            <div className="preference-info">
                                <MdLanguage className="preference-icon" />
                                <div>
                                    <span className="preference-title">Idioma</span>
                                    <p className="preference-description">Selecciona tu idioma preferido</p>
                                </div>
                            </div>
                            <select 
                                value={preferences.display.language}
                                onChange={(e) => handlePreferenceChange('display', 'language', e.target.value)}
                                className="preference-select"
                            >
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="pt">Português</option>
                            </select>
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaPalette className="preference-icon" />
                                <div>
                                    <span className="preference-title">Tema</span>
                                    <p className="preference-description">Elige entre tema claro u oscuro</p>
                                </div>
                            </div>
                            <select 
                                value={preferences.display.theme}
                                onChange={(e) => handlePreferenceChange('display', 'theme', e.target.value)}
                                className="preference-select"
                            >
                                <option value="light">Claro</option>
                                <option value="dark">Oscuro</option>
                                <option value="auto">Automático</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Preferencias deportivas */}
                <div className="preference-section">
                    <div className="section-header">
                        <MdSports className="section-icon" />
                        <h4>Deportes</h4>
                    </div>
                    
                    <div className="preference-group">
                        <div className="preference-item">
                            <div className="preference-info">
                                <MdSports className="preference-icon" />
                                <div>
                                    <span className="preference-title">Deportes favoritos</span>
                                    <p className="preference-description">Selecciona tus deportes preferidos</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="sports-grid">
                            {['Fútbol', 'Básquet', 'Tenis', 'Vóley', 'Paddle'].map(sport => (
                                <label key={sport} className="sport-checkbox">
                                    <input 
                                        type="checkbox"
                                        checked={preferences.sports.favoriteCategories.includes(sport)}
                                        onChange={(e) => handleArrayChange('sports', 'favoriteCategories', sport, e.target.checked)}
                                    />
                                    <div className="sport-option">
                                        <div className="sport-icon">{getSportIcon(sport)}</div>
                                        <span>{sport}</span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaMapMarkerAlt className="preference-icon" />
                                <div>
                                    <span className="preference-title">Distancia máxima</span>
                                    <p className="preference-description">Radio de búsqueda en kilómetros</p>
                                </div>
                            </div>
                            <select 
                                value={preferences.sports.maxDistance}
                                onChange={(e) => handlePreferenceChange('sports', 'maxDistance', parseInt(e.target.value))}
                                className="preference-select"
                            >
                                <option value={5}>5 km</option>
                                <option value={10}>10 km</option>
                                <option value={20}>20 km</option>
                                <option value={50}>50 km</option>
                                <option value={100}>Sin límite</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Métodos de pago */}
                <div className="preference-section">
                    <div className="section-header">
                        <FaCreditCard className="section-icon" />
                        <h4>Pagos</h4>
                    </div>
                    
                    <div className="preference-group">
                        <div className="preference-item">
                            <div className="preference-info">
                                <FaCreditCard className="preference-icon" />
                                <div>
                                    <span className="preference-title">Método de pago predeterminado</span>
                                    <p className="preference-description">Selecciona tu método de pago preferido</p>
                                </div>
                            </div>
                            <select 
                                value={preferences.payment.defaultMethod}
                                onChange={(e) => handlePreferenceChange('payment', 'defaultMethod', e.target.value)}
                                className="preference-select"
                            >
                                <option value="credit_card">Tarjeta de crédito</option>
                                <option value="debit_card">Tarjeta de débito</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank_transfer">Transferencia bancaria</option>
                            </select>
                        </div>

                        <div className="preference-item">
                            <div className="preference-info">
                                <FaShieldAlt className="preference-icon" />
                                <div>
                                    <span className="preference-title">Guardar información de pago</span>
                                    <p className="preference-description">Almacena de forma segura tus datos de pago</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={preferences.payment.savePaymentInfo}
                                    onChange={(e) => handlePreferenceChange('payment', 'savePaymentInfo', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            {hasChanges && (
                <div className="preferences-actions">
                    <button 
                        className="btn-secondary"
                        onClick={handleReset}
                    >
                        <FaUndo /> Restablecer
                    </button>
                    <button 
                        className="btn-primary"
                        onClick={handleSave}
                    >
                        <FaSave /> Guardar cambios
                    </button>
                </div>
            )}
        </div>
    )
}

export default Preferences