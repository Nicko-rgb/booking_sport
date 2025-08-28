import React, { useState, useRef } from 'react';
import '../styles/DynamicTable.css';
import { FaUser } from "react-icons/fa";

const DynamicTable = ({
    fechaInicio,
    fechaFin,
    reservas = [],
    instalacion = { horaApertura: '10:00', horaCierre: '20:00' },
    fechaSeleccionada = null,
    tipoVista,
    selectReservation, 
    handleClickReserva
}) => {
    const tableRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showGuides, setShowGuides] = useState(false);

    // Generar array de fechas para la semana
    const generarFechasSemana = () => {
        const fechas = [];
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        for (let fecha = new Date(inicio); fecha <= fin; fecha.setDate(fecha.getDate() + 1)) {
            fechas.push(new Date(fecha));
        }
        return fechas;
    };

    // Generar horarios para mostrar
    const generarHorarios = () => {
        const [horaInicio] = instalacion.horaApertura.split(':').map(Number);
        const [horaFin] = instalacion.horaCierre.split(':').map(Number);
        const horarios = [];

        for (let hora = horaInicio; hora <= horaFin; hora++) {
            horarios.push({ tiempo: `${hora.toString().padStart(2, '0')}:00` });
        }
        return horarios;
    };

    // Manejar movimiento del mouse para líneas guía
    const handleMouseMove = (e) => {
        if (tableRef.current) {
            const rect = tableRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    // Calcular hora y minuto basándose en la posición Y del mouse
    const calcularHoraDesdeMouseY = (mouseY) => {
        const headerElement = tableRef.current?.querySelector('.table-header');
        const bodyY = mouseY - (headerElement?.offsetHeight || 60);

        if (bodyY < 0) return null;

        const [horaInicio] = instalacion.horaApertura.split(':').map(Number);
        const [horaFin] = instalacion.horaCierre.split(':').map(Number);
        const timeCellElement = tableRef.current?.querySelector('.time-cell');
        const alturaPorHora = timeCellElement?.offsetHeight || 60;

        const celdaHora = Math.floor(bodyY / alturaPorHora);
        const posicionDentroCelda = bodyY % alturaPorHora;
        let minutosEnHora = Math.floor((posicionDentroCelda / alturaPorHora) * 60);
        let horaAbsoluta = horaInicio + celdaHora;

        if (minutosEnHora >= 60) {
            horaAbsoluta += Math.floor(minutosEnHora / 60);
            minutosEnHora = minutosEnHora % 60;
        }

        if (horaAbsoluta >= horaFin) {
            return `${horaFin.toString().padStart(2, '0')}:00`;
        }

        return `${horaAbsoluta.toString().padStart(2, '0')}:${minutosEnHora.toString().padStart(2, '0')}`;
    };

    const fechas = generarFechasSemana();
    const horarios = generarHorarios();

    // Función para obtener reservas de una fecha específica
    const obtenerReservasPorFecha = (fecha) => {
        const fechaStr = fecha.toISOString().split('T')[0];
        return reservas.filter(reserva => reserva.fecha === fechaStr);
    };

    // Calcular posición vertical de reserva
    const calcularPosicionVertical = (reserva) => {
        const [horaInicio] = instalacion.horaApertura.split(':').map(Number);
        const [hora, minuto] = reserva.horaInicio.split(':').map(Number);
        const [horaFin, minutoFin] = reserva.horaFin.split(':').map(Number);

        const timeCellElement = tableRef.current?.querySelector('.time-cell');
        const alturaPorHora = timeCellElement?.offsetHeight || 60;

        const posicionY = ((hora - horaInicio) * alturaPorHora) + ((minuto / 60) * alturaPorHora);
        const posicionYFin = ((horaFin - horaInicio) * alturaPorHora) + ((minutoFin / 60) * alturaPorHora);

        return { posicionY, altura: Math.max(posicionYFin - posicionY, 20) };
    };

    // Manejar click en celda para crear reserva
    const handleCellClick = (e, fecha) => {
        const rect = tableRef.current.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const hora = calcularHoraDesdeMouseY(mouseY);

        if (hora) {
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            alert(`Fecha: ${fechaFormateada}\nHora: ${hora}`);
        }
    };

    return (
        <div
            className="table_reservation"
            ref={tableRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowGuides(true)}
            onMouseLeave={() => setShowGuides(false)}
        >
            {/* Líneas guía */}
            {showGuides && (
                <>
                    <div
                        className="guide-line-horizontal"
                        style={{ top: mousePosition.y }}
                    >
                        {calcularHoraDesdeMouseY(mousePosition.y) && (
                            <div className="guide-time-label">
                                {calcularHoraDesdeMouseY(mousePosition.y)}
                            </div>
                        )}
                    </div>
                    <div
                        className="guide-line-vertical"
                        style={{ left: mousePosition.x }}
                    >
                    </div>
                </>
            )}

            {/* Header con fechas */}
            <div className="table-header">
                <div className="header_time_cell">Horario</div>
                {fechas.map((fecha, index) => {
                    const esFechaSeleccionada = fechaSeleccionada &&
                        fecha.toDateString() === fechaSeleccionada.toDateString();

                    return (
                        <div key={index} className={`date-column-header ${tipoVista === 'month' ? 'data_header_columna' : ''}`}>
                            <span className="date-day">
                                {fecha.toLocaleDateString('es-ES', { weekday: 'short' })}
                            </span>
                            <span className={`date-number ${esFechaSeleccionada ? 'fecha_hoy' : ''}`}>
                                {fecha.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Cuerpo de la tabla con estructura por columnas */}
            <div className="table-body-grid">
                {/* Columna de horarios */}
                <div className="time-column">
                    {horarios.map((horario, index) => (
                        <div key={index} className="time-cell">
                            <span className="time_text">{horario.tiempo}</span>
                        </div>
                    ))}
                </div>

                {/* Columnas de fechas */}
                {fechas.map((fecha, columnaIndex) => {
                    const reservasFecha = obtenerReservasPorFecha(fecha);

                    return (
                        <div key={columnaIndex} className="date-column" data-fecha={fecha.toISOString().split('T')[0]}>
                            {/* Celdas de fondo para cada hora */}
                            {horarios.map((horario, filaIndex) => (
                                <div
                                    key={filaIndex}
                                    className="date-cell"
                                    data-hora={horario.tiempo}
                                    onClick={(e) => handleCellClick(e, fecha)}
                                >
                                    <div className="grid-lines"></div>
                                </div>
                            ))}

                            {/* Reservas de esta fecha */}
                            {reservasFecha.map((reserva, reservaIndex) => {
                                const posicion = calcularPosicionVertical(reserva);

                                return (
                                    <div
                                        key={reservaIndex}
                                        className={`reservation-block ${reserva.estado || ''}`}
                                        style={{
                                            top: `${posicion.posicionY}px`,
                                            height: `${posicion.altura}px`,
                                        }}
                                    >
                                        <div onClick={() => handleClickReserva(reserva)} className={`content-block ${tipoVista === 'month' ? 'content-block_month' : ''}`}>
                                            <div className="reservation-title">
                                                <FaUser />
                                                <div className='user_name'>{reserva.cliente} </div>
                                            </div>
                                            <div className="reservation-time">{reserva.horaInicio} - {reserva.horaFin}</div>
                                        </div>
                                        {/* Modal de detalles de reserva dinamico, entcontrar un espacio al rederdor automatico */}
                                        
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default DynamicTable;