import React from 'react';
import '../../styles/calendarReserv.css';
import { useReservationStore } from '../../context/ReservationContext';

const Calendars = ({ open, onClose, onDateSelect }) => {
    const {
        mesActual,
        fechaSeleccionadaCalendario,
        generarDiasCalendario,
        manejarSeleccionFechaCalendario,
        navegarMes,
        obtenerNombreMes,
        obtenerNombresDias,
        limpiarSeleccionCalendario
    } = useReservationStore();

    if (!open) return null;

    // Manejar selección de fecha
    const manejarSeleccionFecha = (fecha) => {
        manejarSeleccionFechaCalendario(fecha);
        onDateSelect(fecha);
        onClose();
    };

    // Cerrar modal
    const cerrarModal = () => {
        limpiarSeleccionCalendario();
        onClose();
    };

    const dias = generarDiasCalendario();
    const nombresDias = obtenerNombresDias();

    return (
        <div className="reservation-calendar modal" onClick={cerrarModal}>
            {/* Contenido */}
            <div className="contenido-reserva" onClick={(e) => e.stopPropagation()}>
                {/* Encabezado del calendario */}
                <div className="reservation-header">
                    <h2>Reservar Espacio Deportivo</h2>
                    <button className="close-btn" onClick={cerrarModal}>
                        ✕
                    </button>
                </div>
                {/* Cuerpo de modal de reservacion */}
                <section className="reservation-body">
                    <div className="calendar-navigation">
                        <button onClick={() => navegarMes(-1)}>‹</button>
                        <h3>{obtenerNombreMes(mesActual)} {mesActual.getFullYear()}</h3>
                        <button onClick={() => navegarMes(1)}>›</button>
                    </div>
                    {/* Grid del calendario */}
                    <div className="calendar-grid">
                        <div className="calendar-days-header">
                            {nombresDias.map(dia => (
                                <div key={dia} className="day-header">{dia}</div>
                            ))}
                        </div>
                        <div className="calendar-days">
                            {dias.map((dia, index) => (
                                <div
                                    key={index}
                                    className={`calendar-day ${dia.esMesAnterior ? 'previous-month' :
                                            dia.esFechaPasada ? 'past-date' :
                                                dia.esValida ? 'valid' : 'invalid'
                                        } ${dia.esHoy ? 'today' : ''
                                        } ${dia.esSeleccionada ? 'selected' : ''
                                        }`}
                                    onClick={() => dia.esValida && manejarSeleccionFecha(dia.fecha)}
                                >
                                    {dia.numero}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Pie de modal de calendario */}
            </div>
        </div>
    );
};

export default Calendars;