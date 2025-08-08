// Componente de Tarjeta para mostrar información de un establecimiento.
import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../styles/Facilityes/cards.css';
import { Button1, Button2 } from '../../../shared/components/ui/Buttons';

const Card = ({ facility }) => {
    const navigate = useNavigate()
    // Función para renderizar las estrellas de calificación
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }

        return stars;
    };

    // Función para obtener el estado de disponibilidad
    const getAvailabilityStatus = (available, isPremium) => {
        if (isPremium) return { text: 'Premium', class: 'premium' };
        if (available) return { text: 'Disponible', class: 'available' };
        return { text: 'No disponible', class: 'unavailable' };
    };

    const availability = getAvailabilityStatus(facility.available, facility.isPremium);

    // Funcion para ver mas sobre la instalacion
    const handleView = () => {
        console.log('Viendo...');
        navigate(`/space-sport?facility=${facility.id}`)
    }

    return (
        <div className="facility-card">
            {/* Imagen del establecimiento */}
            <div className="card-image">
                <img src={facility.image} alt={facility.name} />
                <div className={`availability-badge ${availability.class}`}>
                    {availability.text}
                </div>
                {facility.isPremium && (
                    <div className="premium-badge">
                        <i className="fas fa-crown"></i>
                    </div>
                )}
            </div>

            {/* Contenido de la tarjeta */}
            <div className="card-content">
                {/* Nombre y calificación */}
                <div className="card-header">
                    <h3 className="facility-name">{facility.name}</h3>
                    <div className="rating">
                        <div className="stars">
                            {renderStars(facility.rating)}
                        </div>
                        <span className="rating-number">({facility.rating})</span>
                    </div>
                </div>

                {/* Ubicación */}
                <div className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                        {typeof facility.location === 'string' 
                            ? facility.location 
                            : facility.location?.address || facility.location?.city || 'Ubicación no disponible'
                        }
                    </span>
                </div>

                {/* Deportes disponibles */}
                <div className="sports">
                    <h4>Deportes disponibles:</h4>
                    <div className="sports-list">
                        {facility.availableSports.map((sport, index) => (
                            <span key={index} className="sport-tag">
                                {sport}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Servicios */}
                <div className="services">
                    <h4>Características:</h4>
                    <div className="services-list">
                        {facility.features.map((feature, index) => (
                            <span key={index} className="service-item">
                                <i className="fas fa-check"></i>
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Precio y horarios */}
                <div className="card-details">
                    <div className="price">
                        <span className="price-label">Desde:</span>
                        <span className="price-amount">s/{facility.pricePerHour}</span>
                    </div>
                    <div className="schedule">
                        <i className="fas fa-clock"></i>
                        <span>{facility.openHours}</span>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="card-actions">
                <Button1 text='Ver Detalles' onClick={handleView} />
                <Button2 text='Reservar' />
            </div>
        </div>
    )
}

export default Card