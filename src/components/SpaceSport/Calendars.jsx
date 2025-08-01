import React, { useState, useEffect } from 'react';
import '../../styles/calendarReserv.css';
import { generarHorariosFecha, obtenerInfoReserva, esFechaValida, ESTADO_HORARIO } from '../../data/horarios';

const Calendars = ({ open, onClose }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [mesActual, setMesActual] = useState(new Date());
    const [mostrarHorarios, setMostrarHorarios] = useState(false);

    if (!open) return null;

    // Generar días del calendario
    const generarDiasCalendario = () => {
        const año = mesActual.getFullYear();
        const mes = mesActual.getMonth();
        const primerDia = new Date(año, mes, 1);
        const ultimoDia = new Date(año, mes + 1, 0);
        const primerDiaSemana = primerDia.getDay();
        const diasEnMes = ultimoDia.getDate();
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Resetear horas para comparación exacta

        const dias = [];

        // Días del mes anterior
        if (primerDiaSemana > 0) {
            const mesAnterior = new Date(año, mes - 1, 0);
            const diasMesAnterior = mesAnterior.getDate();
            
            for (let i = primerDiaSemana - 1; i >= 0; i--) {
                const diaAnterior = diasMesAnterior - i;
                const fechaAnterior = new Date(año, mes - 1, diaAnterior);
                fechaAnterior.setHours(0, 0, 0, 0);
                
                dias.push({
                    numero: diaAnterior,
                    fecha: fechaAnterior,
                    esValida: false, // Los días del mes anterior no son válidos
                    esHoy: false,
                    esSeleccionada: false,
                    esMesAnterior: true
                });
            }
        }

        // Días del mes actual
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fecha = new Date(año, mes, dia);
            fecha.setHours(0, 0, 0, 0);
            
            const esFechaPasada = fecha < hoy;
            const esFechaValidaHoy = !esFechaPasada && esFechaValida(new Date(fecha));
            
            dias.push({
                numero: dia,
                fecha: fecha,
                esValida: esFechaValidaHoy,
                esHoy: fecha.getTime() === hoy.getTime(),
                esSeleccionada: fechaSeleccionada && fecha.toDateString() === fechaSeleccionada.toDateString(),
                esFechaPasada: esFechaPasada,
                esMesAnterior: false
            });
        }

        return dias;
    };

    // Manejar selección de fecha
    const manejarSeleccionFecha = (fecha) => {
        if (!esFechaValida(new Date(fecha))) return;
        
        setFechaSeleccionada(fecha);
        setHorariosSeleccionados([]);
        const horariosDelDia = generarHorariosFecha(fecha);
        setHorarios(horariosDelDia);
        setMostrarHorarios(true);
    };

    // Manejar selección de horario
    const manejarSeleccionHorario = (horario) => {
        if (!horario.disponible) return;
        
        const yaSeleccionado = horariosSeleccionados.some(h => h.hora === horario.hora);
        
        if (yaSeleccionado) {
            // Deseleccionar horario
            setHorariosSeleccionados(horariosSeleccionados.filter(h => h.hora !== horario.hora));
        } else {
            // Seleccionar horario
            setHorariosSeleccionados([...horariosSeleccionados, horario]);
        }
    };

    // Navegar meses
    const navegarMes = (direccion) => {
        const nuevoMes = new Date(mesActual);
        nuevoMes.setMonth(mesActual.getMonth() + direccion);
        setMesActual(nuevoMes);
    };

    // Confirmar reserva
    const confirmarReserva = () => {
        if (!fechaSeleccionada || horariosSeleccionados.length === 0) return;
        
        const totalPrecio = horariosSeleccionados.reduce((total, horario) => total + horario.precio, 0);
        const horasReservadas = horariosSeleccionados.map(h => h.hora).join(', ');
        
        alert(`Reserva confirmada:\nFecha: ${fechaSeleccionada.toLocaleDateString('es-PE')}\nHoras: ${horasReservadas}\nTotal de horas: ${horariosSeleccionados.length}\nPrecio total: S/ ${totalPrecio}`);
        onClose();
    };

    // Cerrar modal
    const cerrarModal = () => {
        setFechaSeleccionada(null);
        setHorariosSeleccionados([]);
        setMostrarHorarios(false);
        onClose();
    };

    const dias = generarDiasCalendario();
    
    // Obtener nombres de meses y días usando métodos nativos de JavaScript
    const obtenerNombreMes = (fecha) => {
        return fecha.toLocaleDateString('es-ES', { month: 'long' });
    };
    
    const obtenerNombresDias = () => {
        const dias = [];
        const fecha = new Date(2024, 0, 7); // Domingo
        for (let i = 0; i < 7; i++) {
            dias.push(fecha.toLocaleDateString('es-ES', { weekday: 'short' }));
            fecha.setDate(fecha.getDate() + 1);
        }
        return dias;
    };
    
    const nombresDias = obtenerNombresDias();

    return (
        <div className="calendar-modal-overlay" onClick={cerrarModal}>
            <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
                <div className="calendar-header">
                    <h2>Reservar Espacio Deportivo</h2>
                    <button className="close-btn" onClick={cerrarModal}>
                        ✕
                    </button>
                </div>

                <div className="calendar-content">
                    {!mostrarHorarios ? (
                        <div className="calendar-section">
                            <div className="calendar-navigation">
                                <button onClick={() => navegarMes(-1)}>‹</button>
                                <h3>{obtenerNombreMes(mesActual)} {mesActual.getFullYear()}</h3>
                                <button onClick={() => navegarMes(1)}>›</button>
                            </div>

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
                                            className={`calendar-day ${
                                                dia.esMesAnterior ? 'previous-month' : 
                                                dia.esFechaPasada ? 'past-date' :
                                                dia.esValida ? 'valid' : 'invalid'
                                            } ${
                                                dia.esHoy ? 'today' : ''
                                            } ${
                                                dia.esSeleccionada ? 'selected' : ''
                                            }`}
                                            onClick={() => dia.esValida && manejarSeleccionFecha(dia.fecha)}
                                        >
                                            {dia.numero}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="horarios-section">
                            <div className="horarios-header">
                                <button 
                                    className="back-btn" 
                                    onClick={() => setMostrarHorarios(false)}
                                >
                                    ← Volver al calendario
                                </button>
                                <h3>Horarios para {fechaSeleccionada?.toLocaleDateString('es-PE')}</h3>
                            </div>

                            <div className="horarios-grid">
                                {horarios.map((horario, index) => (
                                    <div
                                        key={index}
                                        className={`horario-item ${
                                            horario.estado
                                        } ${
                                            horariosSeleccionados.some(h => h.hora === horario.hora) ? 'selected' : ''
                                        }`}
                                        onClick={() => manejarSeleccionHorario(horario)}
                                    >
                                        <div className="horario-hora">{horario.hora}</div>
                                        <div className="horario-precio">
                                            {horario.disponible ? `S/ ${horario.precio}` : ''}
                                        </div>
                                        <div className="horario-estado">
                                            {horario.estado === ESTADO_HORARIO.LIBRE && 'Disponible'}
                                            {horario.estado === ESTADO_HORARIO.OCUPADO && 'Ocupado'}
                                            {horario.estado === ESTADO_HORARIO.NO_DISPONIBLE && 'No disponible'}
                                            {horario.estado === ESTADO_HORARIO.MANTENIMIENTO && 'Mantenimiento'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {horariosSeleccionados.length > 0 && (
                                <div className="reserva-resumen">
                                    <h4>Resumen de Reserva</h4>
                                    <div className="resumen-detalles">
                                        <p><strong>Fecha:</strong> {fechaSeleccionada.toLocaleDateString('es-PE')}</p>
                                        <p><strong>Horarios seleccionados:</strong></p>
                                        <ul className="horarios-lista">
                                            {horariosSeleccionados.map((horario, index) => (
                                                <li key={index}>
                                                    {horario.hora} - S/ {horario.precio}
                                                </li>
                                            ))}
                                        </ul>
                                        <p><strong>Total de horas:</strong> {horariosSeleccionados.length}</p>
                                        <p><strong>Precio total:</strong> S/ {horariosSeleccionados.reduce((total, horario) => total + horario.precio, 0)}</p>
                                    </div>
                                    <button 
                                        className="confirmar-btn"
                                        onClick={confirmarReserva}
                                    >
                                        Confirmar Reserva ({horariosSeleccionados.length} hora{horariosSeleccionados.length !== 1 ? 's' : ''})
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendars;