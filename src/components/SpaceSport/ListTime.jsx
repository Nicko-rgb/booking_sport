import React, { useState, useEffect } from 'react';
import { useReservationStore } from '../../context/ReservationContext';
import '../../styles/SpaceSport/listTime.css';
import { MdOutlineTouchApp } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const ListTime = ({ open, onClose, fecha, onShowReservation, onBackToCalendar }) => {
    const {
        generarHorariosDia,
        agregarHorario,
        removerHorario,
        estaSeleccionado,
        totalHorasSeleccionadas
    } = useReservationStore();

    const [horarios, setHorarios] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (open && fecha) {
            cargarHorarios();
        }
    }, [open, fecha]);

    const cargarHorarios = async () => {
        setCargando(true);
        try {
            const horariosDelDia = await generarHorariosDia(fecha);
            setHorarios(horariosDelDia);
        } catch (error) {
            console.error('Error al cargar horarios:', error);
            setHorarios([]);
        } finally {
            setCargando(false);
        }
    };

    if (!open || !fecha) return null;

    const manejarSeleccionHorario = (horario) => {
        if (!horario.disponible) return;

        if (estaSeleccionado(horario.id)) {
            removerHorario(horario.id);
        } else {
            agregarHorario(horario);
        }
    };

    return (
        <div className="reservation-time modal" onClick={onClose}>
            {/* contenido */}
            <div className="contenido-reserva" onClick={(e) => e.stopPropagation()}>
                {/* Encabezado de horarios */}
                <div className="reservation-header">
                    <h2>Horarios Disponibles</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                {/* Cuerpo de modal de reservacion */}
                <section className="reservation-body">
                    <div className="fecha-seleccionada">
                        <h3>{fecha.toLocaleDateString('es-PE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</h3>
                        <span className="contador-horas">
                            <strong>{totalHorasSeleccionadas}</strong> Hrs
                        </span>
                    </div>

                    {cargando ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Cargando horarios disponibles...</p>
                        </div>
                    ) : (
                        <div className="horarios-tabla-container">
                            <table className="horarios-tabla">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}><MdOutlineTouchApp fontSize={20} /></th>
                                        <th>Horario</th>
                                        <th>Estado</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horarios.map((horario) => (
                                        <tr
                                            key={horario.id}
                                            className={`horario-fila ${horario.estado} ${estaSeleccionado(horario.id) ? 'seleccionado' : ''
                                                } ${horario.disponible ? 'clickable' : ''}`}
                                            onClick={() => horario.disponible && manejarSeleccionHorario(horario)}
                                            style={{ cursor: horario.disponible ? 'pointer' : 'default' }}
                                        >
                                            <td className='check'>
                                                <input
                                                    type="checkbox"
                                                    checked={estaSeleccionado(horario.id)}
                                                    onChange={() => manejarSeleccionHorario(horario)}
                                                    disabled={!horario.disponible}
                                                    className="horario-checkbox"
                                                />
                                            </td>
                                            <td className="horario-tiempo">{horario.horaDisplay}</td>
                                            <td className={`horario-estado ${horario.estado}`}>
                                                <span className="estado-badge">
                                                    {horario.estado}
                                                </span>
                                            </td>
                                            <td className="horario-precio">
                                                {horario.disponible ? `S/ ${horario.precio}` : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
                {/* Pie de modal de horarios */}
                <div className="footer-actions">
                    <button
                        className="btn-volver"
                        onClick={onBackToCalendar}
                    >
                        <IoIosArrowBack fontSize={18} /> Volver
                    </button>

                    {totalHorasSeleccionadas > 0 && (
                        <button
                            className="btn-reservar"
                            onClick={() => {
                                onShowReservation();
                                onClose();
                            }}
                        >
                            RESERVAR ({totalHorasSeleccionadas})
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListTime;