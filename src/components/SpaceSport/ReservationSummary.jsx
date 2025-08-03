import React from 'react';
import { useReservationStore } from '../../context/ReservationContext';
import '../../styles/reservationSummary.css';
import { IoIosArrowBack } from "react-icons/io";

const ReservationSummary = ({ open, onClose, onConfirm, onBackToListTime }) => {
    const {
        horariosSeleccionados,
        calcularPrecioTotal,
        agruparHorariosPorFecha,
        limpiarSelecciones
    } = useReservationStore();

    if (!open) return null;

    const horariosPorFecha = agruparHorariosPorFecha();
    const precioTotal = calcularPrecioTotal();
    const totalHoras = horariosSeleccionados.length;

    const manejarConfirmarReserva = () => {
        // Aquí se puede agregar la lógica para enviar la reserva al backend
        console.log('Reserva confirmada:', {
            horarios: horariosSeleccionados,
            total: precioTotal,
            fechas: Object.keys(horariosPorFecha)
        });

        // Limpiar selecciones después de confirmar
        limpiarSelecciones();

        // Llamar al callback de confirmación
        onConfirm();

        // Cerrar modal
        onClose();

        // Mostrar mensaje de éxito (opcional)
        alert('¡Reserva confirmada exitosamente!');
    };

    const formatearFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-PE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="reservation-details modal" onClick={onClose}>
            {/* Contenido */}
            <div className="contenido-reserva" onClick={(e) => e.stopPropagation()}>
                {/* Header de detelles de reserva */}
                <div className="reservation-header">
                    <h2>Resumen de Reserva</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                {/* Cuerpo de modal de Detalles */}
                <div className="reservation-body">
                    <div className="reservation-summary">
                        <div className="summary-stats">
                            <div className="stat-item">
                                <span className="stat-label">Horas:</span>
                                <span className="stat-value">{totalHoras}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Fechas:</span>
                                <span className="stat-value">{Object.keys(horariosPorFecha).length}</span>
                            </div>
                            <div className="stat-item total-price">
                                <span className="stat-label">Total:</span>
                                <span className="stat-value">S/ {precioTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="reservation-details">
                        <h3>Detalles de la Reserva</h3>

                        {Object.entries(horariosPorFecha).map(([fecha, horarios]) => (
                            <div key={fecha} className="fecha-group">
                                <div className="fecha-header">
                                    <h4>{formatearFecha(fecha)}</h4>
                                    <span className="fecha-count">{horarios.length} hora{horarios.length > 1 ? 's' : ''}</span>
                                </div>

                                <div className="horarios-list">
                                    {horarios.map((horario) => (
                                        <div key={horario.id} className="row-horario">
                                            <span className="horario-time">{horario.horaDisplay}</span>
                                            <span className="horario-price">S/ {horario.precio}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="fecha-subtotal">
                                    <span>Subtotal: S/ {horarios.reduce((sum, h) => sum + h.precio, 0).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Pie de modal de detalles */}
                <div className="footer-actions">
                    <button
                        className="btn-volver"
                        onClick={onBackToListTime}
                    >
                        <IoIosArrowBack fontSize={18} /> VOLVER
                    </button>

                    <button
                        className="btn-cancelar"
                        onClick={onClose}
                    >
                        CANCELAR
                    </button>

                    <button
                        className="btn-confirmar"
                        onClick={manejarConfirmarReserva}
                        disabled={totalHoras === 0}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationSummary;