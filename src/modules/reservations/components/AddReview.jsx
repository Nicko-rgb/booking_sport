// Componente del formulario de SpaceSport.jsx para agregar un comentario
// acerca de la instalcion deportiva

import React from 'react';
import '../../../styles/SpaceSport/addReview.css';
import { Button1 } from '../../../shared/components/ui/Buttons';
import { FaTelegramPlane } from "react-icons/fa";

const AddReview = () => {
    return (
        <div className="addReview">
            <h2>Deja tu comentario</h2>
            <div className="form-comentario">
                <textarea
                    placeholder="Comparte tu experiencia en este establecimiento..."
                    rows="4"
                ></textarea>
                <div className="form-footer">
                    <div className="calificacion-input">
                        <span>Tu calificación:</span>
                        <div className="estrellas-input">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span key={index} className="estrella-input">★</span>
                            ))}
                        </div>
                    </div>
                    <Button1 Icon={FaTelegramPlane} text='Enviar Comentario' />
                </div>
            </div>
        </div>
    )
}

export default AddReview