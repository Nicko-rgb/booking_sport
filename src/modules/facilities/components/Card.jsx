import React from 'react';
import '../styles/cards.css';
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button1, Button2 } from '../../../shared/components/ui/Buttons';

const Card = ({ facility }) => {
    const navigate = useNavigate();
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

    // Funcion para ver mas sobre la instalacion
    const handleView = () => {
        console.log('Viendo...');
        navigate(`/space-sport?facility=${facility.id}`)
    }

    return (
        <div className='facility_card'>
            <aside>
                {/* Encabezado de card */}
                <article className='header_article_facility'>
                    {/* <div className="forma"></div> */}
                    <img src={facility.image} alt="" />
                    <div className="info_facility_card">
                        <h4 className='name_card_facility'>{facility.name}</h4>
                        <div className='ratings'>
                            <div className="stars">{renderStars(facility.rating)}</div>
                            <span>{facility.rating} </span>
                        </div>
                    </div>
                </article>

                {/* Cuerpo de card - informacion */}
                <article className='body_card_facility'>
                    <p className="adress_facility"><IoLocationSharp /> {facility.location}</p>
                    {/* Deportes disponibles */}
                    <h5>Deportes disponibles:</h5>
                    <div className="sports-list">
                        {facility.availableSports.map((sport, index) => (
                            <span key={index} className="sport_tag">
                                {sport}
                            </span>
                        ))}
                    </div>
                    {/* Caracteristicas */}
                    <h5>Características:</h5>
                    <div className="services_list">
                        {facility.features.map((feature, index) => (
                            <span key={index} className="service_tag">
                                <i className="fas fa-check"></i>
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* Precio y horarios */}
                    <div className="card_details">
                        <div className="price">
                            <span className="price-label">Desde:</span>
                            <span className="price-amount">s/{facility.pricePerHour}</span>
                        </div>
                        <div className="schedule">
                            <i className="fas fa-clock"></i>
                            <span>{facility.openHours}</span>
                        </div>
                    </div>
                </article>
            </aside>

            {/* Pie de llamado a la accion - Footer */}
            <article className='accions_card_facility'>
                <Button1 onClick={handleView} text='Ver Detalles' />
                <Button2 text='Reservar' />
            </article>
        </div>
    )
}

export default Card