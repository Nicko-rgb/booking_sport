import React, { useState } from 'react';
import '../styles/PricingManagement.css'
import { 
    FiDollarSign, 
    FiTrendingUp, 
    FiTrendingDown,
    FiPercent,
    FiCalendar,
    FiClock,
    FiEdit,
    FiSave,
    FiX,
    FiPlus,
    FiCopy,
    FiSettings
} from 'react-icons/fi';
import { MdSportsFootball, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';

const PricingManagement = () => {
    // Estados para la gestión de precios
    const [selectedCourt, setSelectedCourt] = useState('all');
    const [priceType, setPriceType] = useState('base'); // base, peak, discount
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPrice, setEditingPrice] = useState(null);
    const [showDiscountModal, setShowDiscountModal] = useState(false);

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

    // Datos simulados de precios
    const pricing = {
        court1: {
            base: {
                morning: 25000, // 6:00 - 12:00
                afternoon: 30000, // 12:00 - 18:00
                evening: 40000, // 18:00 - 22:00
                night: 35000 // 22:00 - 6:00
            },
            peak: {
                friday: 45000,
                saturday: 50000,
                sunday: 45000
            },
            discounts: [
                {
                    id: 1,
                    name: 'Estudiantes',
                    percentage: 15,
                    conditions: 'Lunes a Viernes antes de 16:00',
                    active: true
                },
                {
                    id: 2,
                    name: 'Tercera Edad',
                    percentage: 20,
                    conditions: 'Todos los días',
                    active: true
                }
            ]
        },
        court3: {
            base: {
                morning: 30000,
                afternoon: 35000,
                evening: 45000,
                night: 40000
            },
            peak: {
                friday: 50000,
                saturday: 55000,
                sunday: 50000
            },
            discounts: [
                {
                    id: 3,
                    name: 'Membresía Mensual',
                    percentage: 25,
                    conditions: 'Clientes con membresía activa',
                    active: true
                }
            ]
        }
    };

    // Estadísticas de precios
    const priceStats = {
        averagePrice: 35000,
        highestPrice: 55000,
        lowestPrice: 25000,
        totalRevenue: 2450000,
        monthlyGrowth: 12.5
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

    // Función para obtener precios según el tipo seleccionado
    const getCurrentPricing = () => {
        if (selectedCourt === 'all') {
            return Object.keys(pricing).map(courtId => {
                const court = courts.find(c => c.id === courtId);
                return {
                    courtId,
                    courtName: court?.name,
                    sport: court?.sport,
                    pricing: pricing[courtId]
                };
            });
        } else {
            const court = courts.find(c => c.id === selectedCourt);
            return [{
                courtId: selectedCourt,
                courtName: court?.name,
                sport: court?.sport,
                pricing: pricing[selectedCourt] || { base: {}, peak: {}, discounts: [] }
            }];
        }
    };

    return (
        <div className="pricing-management">
            {/* Header */}
            <div className="section-header">
                <div className="header-content">
                    <h1>Gestión de Precios</h1>
                    <p>Configura los precios base, tarifas especiales y descuentos</p>
                </div>
                <div className="header-actions">
                    <button 
                        className="btn-secondary"
                        onClick={() => setShowDiscountModal(true)}
                    >
                        <FiPercent />
                        <span>Nuevo Descuento</span>
                    </button>
                    <button className="btn-primary">
                        <FiSettings />
                        <span>Configuración Avanzada</span>
                    </button>
                </div>
            </div>

            {/* Estadísticas de precios */}
            <div className="price-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FiDollarSign />
                    </div>
                    <div className="stat-content">
                        <h3>{formatPrice(priceStats.averagePrice)}</h3>
                        <p>Precio Promedio</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <FiTrendingUp />
                    </div>
                    <div className="stat-content">
                        <h3>{formatPrice(priceStats.highestPrice)}</h3>
                        <p>Precio Más Alto</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <FiTrendingDown />
                    </div>
                    <div className="stat-content">
                        <h3>{formatPrice(priceStats.lowestPrice)}</h3>
                        <p>Precio Más Bajo</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <FiDollarSign />
                    </div>
                    <div className="stat-content">
                        <h3>{formatPrice(priceStats.totalRevenue)}</h3>
                        <p>Ingresos del Mes</p>
                        <span className="growth positive">+{priceStats.monthlyGrowth}%</span>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="pricing-filters">
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

                <div className="price-type-selector">
                    <button
                        className={`type-btn ${priceType === 'base' ? 'active' : ''}`}
                        onClick={() => setPriceType('base')}
                    >
                        <FiClock />
                        <span>Precios Base</span>
                    </button>
                    <button
                        className={`type-btn ${priceType === 'peak' ? 'active' : ''}`}
                        onClick={() => setPriceType('peak')}
                    >
                        <FiCalendar />
                        <span>Tarifas Especiales</span>
                    </button>
                    <button
                        className={`type-btn ${priceType === 'discount' ? 'active' : ''}`}
                        onClick={() => setPriceType('discount')}
                    >
                        <FiPercent />
                        <span>Descuentos</span>
                    </button>
                </div>
            </div>

            {/* Contenido según el tipo de precio */}
            <div className="pricing-content">
                {priceType === 'base' && (
                    <div className="base-pricing">
                        <h3>Precios Base por Horario</h3>
                        <div className="courts-pricing">
                            {getCurrentPricing().map(court => (
                                <div key={court.courtId} className="court-pricing-card">
                                    <div className="court-header">
                                        <div className="court-info">
                                            <div className="sport-icon">
                                                {getSportIcon(court.sport)}
                                            </div>
                                            <div className="court-details">
                                                <h4>{court.courtName}</h4>
                                                <span>{court.sport}</span>
                                            </div>
                                        </div>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => {
                                                setEditingPrice({ court, type: 'base' });
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <FiEdit />
                                        </button>
                                    </div>
                                    <div className="time-slots">
                                        <div className="time-slot">
                                            <div className="time-info">
                                                <span className="time-label">Mañana</span>
                                                <span className="time-range">6:00 - 12:00</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.base?.morning || 0)}
                                            </div>
                                        </div>
                                        <div className="time-slot">
                                            <div className="time-info">
                                                <span className="time-label">Tarde</span>
                                                <span className="time-range">12:00 - 18:00</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.base?.afternoon || 0)}
                                            </div>
                                        </div>
                                        <div className="time-slot">
                                            <div className="time-info">
                                                <span className="time-label">Noche</span>
                                                <span className="time-range">18:00 - 22:00</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.base?.evening || 0)}
                                            </div>
                                        </div>
                                        <div className="time-slot">
                                            <div className="time-info">
                                                <span className="time-label">Madrugada</span>
                                                <span className="time-range">22:00 - 6:00</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.base?.night || 0)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {priceType === 'peak' && (
                    <div className="peak-pricing">
                        <h3>Tarifas Especiales</h3>
                        <div className="courts-pricing">
                            {getCurrentPricing().map(court => (
                                <div key={court.courtId} className="court-pricing-card">
                                    <div className="court-header">
                                        <div className="court-info">
                                            <div className="sport-icon">
                                                {getSportIcon(court.sport)}
                                            </div>
                                            <div className="court-details">
                                                <h4>{court.courtName}</h4>
                                                <span>{court.sport}</span>
                                            </div>
                                        </div>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => {
                                                setEditingPrice({ court, type: 'peak' });
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <FiEdit />
                                        </button>
                                    </div>
                                    <div className="peak-slots">
                                        <div className="peak-slot">
                                            <div className="day-info">
                                                <span className="day-label">Viernes</span>
                                                <span className="day-desc">Fin de semana</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.peak?.friday || 0)}
                                            </div>
                                        </div>
                                        <div className="peak-slot">
                                            <div className="day-info">
                                                <span className="day-label">Sábado</span>
                                                <span className="day-desc">Día completo</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.peak?.saturday || 0)}
                                            </div>
                                        </div>
                                        <div className="peak-slot">
                                            <div className="day-info">
                                                <span className="day-label">Domingo</span>
                                                <span className="day-desc">Día completo</span>
                                            </div>
                                            <div className="price">
                                                {formatPrice(court.pricing.peak?.sunday || 0)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {priceType === 'discount' && (
                    <div className="discount-pricing">
                        <div className="section-title">
                            <h3>Descuentos Activos</h3>
                            <button 
                                className="btn-primary"
                                onClick={() => setShowDiscountModal(true)}
                            >
                                <FiPlus />
                                Nuevo Descuento
                            </button>
                        </div>
                        <div className="discounts-grid">
                            {getCurrentPricing().map(court => 
                                court.pricing.discounts?.map(discount => (
                                    <div key={`${court.courtId}-${discount.id}`} className="discount-card">
                                        <div className="discount-header">
                                            <div className="discount-info">
                                                <h4>{discount.name}</h4>
                                                <span className="court-name">{court.courtName}</span>
                                            </div>
                                            <div className="discount-percentage">
                                                {discount.percentage}%
                                            </div>
                                        </div>
                                        <div className="discount-content">
                                            <p className="conditions">{discount.conditions}</p>
                                            <div className="discount-status">
                                                <span className={`status ${discount.active ? 'active' : 'inactive'}`}>
                                                    {discount.active ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="discount-actions">
                                            <button className="action-btn edit">
                                                <FiEdit />
                                            </button>
                                            <button className="action-btn copy">
                                                <FiCopy />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal para editar precios */}
            {showEditModal && editingPrice && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Editar Precios - {editingPrice.court.courtName}</h3>
                            <button 
                                className="modal-close"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingPrice(null);
                                }}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-content">
                            {editingPrice.type === 'base' && (
                                <div className="price-form">
                                    <div className="form-group">
                                        <label>Precio Mañana (6:00 - 12:00)</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.base?.morning || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio Tarde (12:00 - 18:00)</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.base?.afternoon || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio Noche (18:00 - 22:00)</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.base?.evening || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio Madrugada (22:00 - 6:00)</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.base?.night || ''}
                                        />
                                    </div>
                                </div>
                            )}
                            {editingPrice.type === 'peak' && (
                                <div className="price-form">
                                    <div className="form-group">
                                        <label>Precio Viernes</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.peak?.friday || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio Sábado</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.peak?.saturday || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio Domingo</label>
                                        <input 
                                            type="number" 
                                            placeholder="Precio en COP"
                                            defaultValue={editingPrice.court.pricing.peak?.sunday || ''}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="btn-secondary"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingPrice(null);
                                }}
                            >
                                Cancelar
                            </button>
                            <button className="btn-primary">
                                <FiSave />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para nuevo descuento */}
            {showDiscountModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Nuevo Descuento</h3>
                            <button 
                                className="modal-close"
                                onClick={() => setShowDiscountModal(false)}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Nombre del Descuento</label>
                                <input 
                                    type="text" 
                                    placeholder="Ej: Estudiantes, Tercera Edad, etc."
                                />
                            </div>
                            <div className="form-group">
                                <label>Porcentaje de Descuento</label>
                                <input 
                                    type="number" 
                                    placeholder="Porcentaje (1-100)"
                                    min="1"
                                    max="100"
                                />
                            </div>
                            <div className="form-group">
                                <label>Condiciones</label>
                                <textarea 
                                    placeholder="Describe las condiciones para aplicar este descuento"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Aplicar a</label>
                                <select>
                                    <option value="all">Todas las canchas</option>
                                    {courts.map(court => (
                                        <option key={court.id} value={court.id}>
                                            {court.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" defaultChecked />
                                    <span>Activar descuento inmediatamente</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="btn-secondary"
                                onClick={() => setShowDiscountModal(false)}
                            >
                                Cancelar
                            </button>
                            <button className="btn-primary">
                                <FiSave />
                                Crear Descuento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PricingManagement;