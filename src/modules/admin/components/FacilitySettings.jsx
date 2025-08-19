import React, { useState } from 'react';
import '../styles/FacilitySettings.css'
import { 
    FiSettings, 
    FiMapPin, 
    FiClock, 
    FiUsers,
    FiWifi,
    FiTruck,
    FiShield,
    FiCamera,
    FiEdit,
    FiSave,
    FiX,
    FiPlus,
    FiTrash2,
    FiUpload,
    FiImage
} from 'react-icons/fi';
import { MdSportsFootball, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';

const FacilitySettings = () => {
    // Estados para la configuración
    const [activeTab, setActiveTab] = useState('general');
    const [editingCourt, setEditingCourt] = useState(null);
    const [showAddCourtModal, setShowAddCourtModal] = useState(false);
    const [showAmenityModal, setShowAmenityModal] = useState(false);

    // Datos simulados de la instalación
    const facilityInfo = {
        name: 'Centro Deportivo El Campeón',
        address: 'Calle 123 #45-67, Bogotá, Colombia',
        phone: '+57 301 234 5678',
        email: 'info@elcampeon.com',
        website: 'www.elcampeon.com',
        description: 'Moderno centro deportivo con canchas de fútbol, tenis y básquet. Ofrecemos las mejores instalaciones para la práctica deportiva.',
        openingHours: {
            monday: { open: '06:00', close: '22:00', closed: false },
            tuesday: { open: '06:00', close: '22:00', closed: false },
            wednesday: { open: '06:00', close: '22:00', closed: false },
            thursday: { open: '06:00', close: '22:00', closed: false },
            friday: { open: '06:00', close: '23:00', closed: false },
            saturday: { open: '07:00', close: '23:00', closed: false },
            sunday: { open: '08:00', close: '21:00', closed: false }
        },
        socialMedia: {
            facebook: '@elcampeondeportivo',
            instagram: '@elcampeon_sports',
            twitter: '@elcampeon_co'
        }
    };

    // Datos simulados de canchas
    const courts = [
        {
            id: 'court1',
            name: 'Cancha de Fútbol 1',
            sport: 'Fútbol',
            capacity: 22,
            dimensions: '100m x 60m',
            surface: 'Césped sintético',
            lighting: true,
            covered: false,
            status: 'active',
            description: 'Cancha de fútbol profesional con césped sintético de última generación'
        },
        {
            id: 'court2',
            name: 'Cancha de Fútbol 2',
            sport: 'Fútbol',
            capacity: 22,
            dimensions: '100m x 60m',
            surface: 'Césped sintético',
            lighting: true,
            covered: false,
            status: 'active',
            description: 'Segunda cancha de fútbol con excelente iluminación nocturna'
        },
        {
            id: 'court3',
            name: 'Cancha de Tenis 1',
            sport: 'Tenis',
            capacity: 4,
            dimensions: '23.77m x 10.97m',
            surface: 'Polvo de ladrillo',
            lighting: true,
            covered: true,
            status: 'active',
            description: 'Cancha de tenis cubierta con superficie de polvo de ladrillo'
        },
        {
            id: 'court4',
            name: 'Cancha de Básquet 1',
            sport: 'Básquet',
            capacity: 10,
            dimensions: '28m x 15m',
            surface: 'Sintético',
            lighting: true,
            covered: true,
            status: 'maintenance',
            description: 'Cancha de básquet cubierta con tableros profesionales'
        }
    ];

    // Servicios y amenidades
    const amenities = [
        {
            id: 1,
            name: 'Estacionamiento',
            icon: <FiTruck />,
            description: '50 espacios de parqueadero gratuito',
            available: true
        },
        {
            id: 2,
            name: 'WiFi Gratuito',
            icon: <FiWifi />,
            description: 'Internet de alta velocidad en todas las áreas',
            available: true
        },
        {
            id: 3,
            name: 'Seguridad 24/7',
            icon: <FiShield />,
            description: 'Vigilancia las 24 horas del día',
            available: true
        },
        {
            id: 4,
            name: 'Cámaras de Seguridad',
            icon: <FiCamera />,
            description: 'Sistema de videovigilancia en todas las canchas',
            available: true
        },
        {
            id: 5,
            name: 'Vestuarios',
            icon: <FiUsers />,
            description: 'Vestuarios con duchas y casilleros',
            available: true
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

    // Días de la semana en español
    const daysOfWeek = {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo'
    };

    return (
        <div className="facility-settings">
            {/* Header */}
            <div className="section-header">
                <div className="header-content">
                    <h1>Configuración de Instalación</h1>
                    <p>Gestiona la información y configuración de tu centro deportivo</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary">
                        <FiUpload />
                        <span>Subir Imágenes</span>
                    </button>
                    <button className="btn-primary">
                        <FiSave />
                        <span>Guardar Cambios</span>
                    </button>
                </div>
            </div>

            {/* Tabs de navegación */}
            <div className="settings-tabs">
                <button
                    className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                >
                    <FiSettings />
                    <span>General</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'courts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courts')}
                >
                    <MdSportsFootball />
                    <span>Canchas</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'hours' ? 'active' : ''}`}
                    onClick={() => setActiveTab('hours')}
                >
                    <FiClock />
                    <span>Horarios</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('amenities')}
                >
                    <FiUsers />
                    <span>Servicios</span>
                </button>
            </div>

            {/* Contenido según la tab activa */}
            <div className="settings-content">
                {activeTab === 'general' && (
                    <div className="general-settings">
                        <div className="settings-section">
                            <h3>Información Básica</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre de la Instalación</label>
                                    <input 
                                        type="text" 
                                        defaultValue={facilityInfo.name}
                                        placeholder="Nombre del centro deportivo"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input 
                                        type="tel" 
                                        defaultValue={facilityInfo.phone}
                                        placeholder="Número de contacto"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        defaultValue={facilityInfo.email}
                                        placeholder="Correo electrónico"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sitio Web</label>
                                    <input 
                                        type="url" 
                                        defaultValue={facilityInfo.website}
                                        placeholder="www.ejemplo.com"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Dirección</label>
                                    <input 
                                        type="text" 
                                        defaultValue={facilityInfo.address}
                                        placeholder="Dirección completa"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Descripción</label>
                                    <textarea 
                                        rows="4"
                                        defaultValue={facilityInfo.description}
                                        placeholder="Describe tu centro deportivo"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="settings-section">
                            <h3>Redes Sociales</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Facebook</label>
                                    <input 
                                        type="text" 
                                        defaultValue={facilityInfo.socialMedia.facebook}
                                        placeholder="@usuario"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Instagram</label>
                                    <input 
                                        type="text" 
                                        defaultValue={facilityInfo.socialMedia.instagram}
                                        placeholder="@usuario"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Twitter</label>
                                    <input 
                                        type="text" 
                                        defaultValue={facilityInfo.socialMedia.twitter}
                                        placeholder="@usuario"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="settings-section">
                            <h3>Imágenes de la Instalación</h3>
                            <div className="image-gallery">
                                <div className="image-upload-area">
                                    <FiImage className="upload-icon" />
                                    <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
                                    <button className="upload-btn">
                                        <FiUpload />
                                        Subir Imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'courts' && (
                    <div className="courts-settings">
                        <div className="section-title">
                            <h3>Gestión de Canchas</h3>
                            <button 
                                className="btn-primary"
                                onClick={() => setShowAddCourtModal(true)}
                            >
                                <FiPlus />
                                Nueva Cancha
                            </button>
                        </div>
                        <div className="courts-grid">
                            {courts.map(court => (
                                <div key={court.id} className={`court-card ${court.status}`}>
                                    <div className="court-header">
                                        <div className="court-info">
                                            <div className="sport-icon">
                                                {getSportIcon(court.sport)}
                                            </div>
                                            <div className="court-details">
                                                <h4>{court.name}</h4>
                                                <span>{court.sport}</span>
                                            </div>
                                        </div>
                                        <div className="court-actions">
                                            <button 
                                                className="action-btn edit"
                                                onClick={() => setEditingCourt(court)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button className="action-btn delete">
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="court-content">
                                        <div className="court-specs">
                                            <div className="spec">
                                                <span className="spec-label">Capacidad:</span>
                                                <span className="spec-value">{court.capacity} personas</span>
                                            </div>
                                            <div className="spec">
                                                <span className="spec-label">Dimensiones:</span>
                                                <span className="spec-value">{court.dimensions}</span>
                                            </div>
                                            <div className="spec">
                                                <span className="spec-label">Superficie:</span>
                                                <span className="spec-value">{court.surface}</span>
                                            </div>
                                        </div>
                                        <div className="court-features">
                                            <div className={`feature ${court.lighting ? 'active' : ''}`}>
                                                Iluminación
                                            </div>
                                            <div className={`feature ${court.covered ? 'active' : ''}`}>
                                                Cubierta
                                            </div>
                                        </div>
                                        <p className="court-description">{court.description}</p>
                                        <div className="court-status">
                                            <span className={`status ${court.status}`}>
                                                {court.status === 'active' ? 'Activa' : 'Mantenimiento'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'hours' && (
                    <div className="hours-settings">
                        <h3>Horarios de Atención</h3>
                        <div className="hours-grid">
                            {Object.entries(facilityInfo.openingHours).map(([day, hours]) => (
                                <div key={day} className="day-hours">
                                    <div className="day-header">
                                        <h4>{daysOfWeek[day]}</h4>
                                        <label className="toggle-switch">
                                            <input 
                                                type="checkbox" 
                                                defaultChecked={!hours.closed}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    {!hours.closed && (
                                        <div className="time-inputs">
                                            <div className="time-group">
                                                <label>Apertura</label>
                                                <input 
                                                    type="time" 
                                                    defaultValue={hours.open}
                                                />
                                            </div>
                                            <div className="time-group">
                                                <label>Cierre</label>
                                                <input 
                                                    type="time" 
                                                    defaultValue={hours.close}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {hours.closed && (
                                        <div className="closed-day">
                                            <span>Cerrado</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'amenities' && (
                    <div className="amenities-settings">
                        <div className="section-title">
                            <h3>Servicios y Amenidades</h3>
                            <button 
                                className="btn-primary"
                                onClick={() => setShowAmenityModal(true)}
                            >
                                <FiPlus />
                                Nuevo Servicio
                            </button>
                        </div>
                        <div className="amenities-grid">
                            {amenities.map(amenity => (
                                <div key={amenity.id} className={`amenity-card ${amenity.available ? 'available' : 'unavailable'}`}>
                                    <div className="amenity-header">
                                        <div className="amenity-icon">
                                            {amenity.icon}
                                        </div>
                                        <div className="amenity-actions">
                                            <button className="action-btn edit">
                                                <FiEdit />
                                            </button>
                                            <button className="action-btn delete">
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="amenity-content">
                                        <h4>{amenity.name}</h4>
                                        <p>{amenity.description}</p>
                                        <div className="amenity-status">
                                            <label className="toggle-switch">
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked={amenity.available}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>{amenity.available ? 'Disponible' : 'No disponible'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal para agregar/editar cancha */}
            {(showAddCourtModal || editingCourt) && (
                <div className="modal-overlay">
                    <div className="modal large">
                        <div className="modal-header">
                            <h3>{editingCourt ? 'Editar Cancha' : 'Nueva Cancha'}</h3>
                            <button 
                                className="modal-close"
                                onClick={() => {
                                    setShowAddCourtModal(false);
                                    setEditingCourt(null);
                                }}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre de la Cancha</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Cancha de Fútbol 1"
                                        defaultValue={editingCourt?.name || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Deporte</label>
                                    <select defaultValue={editingCourt?.sport || ''}>
                                        <option value="">Seleccionar deporte</option>
                                        <option value="Fútbol">Fútbol</option>
                                        <option value="Tenis">Tenis</option>
                                        <option value="Básquet">Básquet</option>
                                        <option value="Voleibol">Voleibol</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Capacidad</label>
                                    <input 
                                        type="number" 
                                        placeholder="Número de personas"
                                        defaultValue={editingCourt?.capacity || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dimensiones</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: 100m x 60m"
                                        defaultValue={editingCourt?.dimensions || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Superficie</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Césped sintético"
                                        defaultValue={editingCourt?.surface || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select defaultValue={editingCourt?.status || 'active'}>
                                        <option value="active">Activa</option>
                                        <option value="maintenance">Mantenimiento</option>
                                        <option value="inactive">Inactiva</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <label>Descripción</label>
                                    <textarea 
                                        rows="3"
                                        placeholder="Describe las características de la cancha"
                                        defaultValue={editingCourt?.description || ''}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={editingCourt?.lighting ?? true}
                                        />
                                        <span>Iluminación</span>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={editingCourt?.covered ?? false}
                                        />
                                        <span>Cubierta</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="btn-secondary"
                                onClick={() => {
                                    setShowAddCourtModal(false);
                                    setEditingCourt(null);
                                }}
                            >
                                Cancelar
                            </button>
                            <button className="btn-primary">
                                <FiSave />
                                {editingCourt ? 'Guardar Cambios' : 'Crear Cancha'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para nuevo servicio */}
            {showAmenityModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Nuevo Servicio</h3>
                            <button 
                                className="modal-close"
                                onClick={() => setShowAmenityModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Nombre del Servicio</label>
                                <input 
                                    type="text" 
                                    placeholder="Ej: Cafetería, Tienda deportiva, etc."
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea 
                                    rows="3"
                                    placeholder="Describe el servicio o amenidad"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" defaultChecked />
                                    <span>Disponible</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="btn-secondary"
                                onClick={() => setShowAmenityModal(false)}
                            >
                                Cancelar
                            </button>
                            <button className="btn-primary">
                                <FiSave />
                                Crear Servicio
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacilitySettings;