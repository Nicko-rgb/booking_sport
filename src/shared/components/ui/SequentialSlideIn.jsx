import React, { useEffect, useState } from 'react';
import '../../styles/SequentialSlideIn.css';

const SequentialSlideIn = ({ 
    children, 
    delay = 200, 
    duration = 600, 
    className = '',
    startDelay = 0,
    direction = 'down' // 'down', 'up', 'left', 'right'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, startDelay);

        return () => clearTimeout(timer);
    }, [startDelay]);

    // Determinar la clase CSS basada en la dirección
    const getDirectionClass = () => {
        switch (direction) {
            case 'up':
                return 'slide-up';
            case 'left':
                return 'slide-left';
            case 'right':
                return 'slide-right';
            case 'down':
            default:
                return ''; // Por defecto es desde arriba hacia abajo
        }
    };

    return (
        <div className={`sequential-slide-container ${getDirectionClass()} ${className}`}>
            {childrenArray.map((child, index) => (
                <div
                    key={index}
                    className={`sequential-slide-item ${isVisible ? 'visible' : ''}`}
                    style={{
                        animationDelay: `${index * delay}ms`,
                        animationDuration: `${duration}ms`
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

/**
 * Componente SequentialSlideIn
 * 
 * Props:
 * - children: Elementos hijos que se animarán secuencialmente
 * - delay: Tiempo en ms entre cada animación de elemento (default: 200ms)
 * - duration: Duración de cada animación individual (default: 600ms)
 * - className: Clases CSS adicionales
 * - startDelay: Retraso inicial antes de comenzar todas las animaciones (default: 0ms)
 *   Útil para sincronizar con otras animaciones o esperar que se cargue contenido
 * - direction: Dirección del slide ('down', 'up', 'left', 'right') (default: 'down')
 *   - 'down': Los elementos aparecen deslizándose desde arriba hacia abajo
 *   - 'up': Los elementos aparecen deslizándose desde abajo hacia arriba
 *   - 'left': Los elementos aparecen deslizándose desde la izquierda
 *   - 'right': Los elementos aparecen deslizándose desde la derecha
 */


export default SequentialSlideIn;