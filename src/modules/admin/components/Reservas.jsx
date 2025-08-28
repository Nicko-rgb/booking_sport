import React, { useRef } from 'react';
import '../styles/reservas.css';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import calendarIco from '../../../assets/imgs/calendar_ico.png';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import { GrCircleQuestion } from "react-icons/gr";
import ReservaView2 from './TableReservas';
import useReservation from '../hooks/useReservation';
import DynamicTable from './DynamicTable';

const Reservas = () => {
    const {
        openMenus,
        mesActual,
        fechaSeleccionadaCalendario,
        semanaSeleccionada,
        generarDiasCalendario,
        navegarMes,
        obtenerNombreMes,
        obtenerNombresDias,
        manejarSeleccionFecha,
        obtenerFechasSemana,
        obtenerFechasDinamicas,
        esDeLaSemanaSeleccionada,
        handleClickOpenMenu,
        toggleContent,
        handleToggleViewReserva,
        vistaReseva,
        handleToggleView,
        tipoVista,
        handleSelectSport,
        deporteSeleccionado,
        selectReservation,
        setSelectReservation,
        handleClickReserva
    } = useReservation();
    const filtersRef = useRef(null);
    const leyendsRef = useRef(null);


    const handleToggle = (type) => {
        const ref = type === 'filters' ? filtersRef : leyendsRef;
        handleClickOpenMenu(type);
        if (ref.current) {
            toggleContent(ref.current);
        }
    };

    return (
        <div className='reservations'>
            {/* Barra lateral */}
            <aside className='menu_lateral'>
                <article>
                    <section className="header_lateral">
                        <img className='ico_calendar' src={calendarIco} alt="calendar" />
                        <div>
                            <h4>{vistaReseva === 1 ? 'Vista de Calendario' : 'Vista de Tabla'} </h4>
                            <p>Administra reservas</p>
                        </div>
                        <CgArrowsExchangeAltV className='ico_cambio_vista' onClick={() => handleToggleViewReserva()} />
                    </section>
                    <section className="calendars">
                        <div className="calendar-navigation">
                            <IoIosArrowBack strokeWidth={2.4} onClick={() => navegarMes(-1)} />
                            <h3>{obtenerNombreMes(mesActual)} {mesActual.getFullYear()}</h3>
                            <IoIosArrowForward strokeWidth={2.4} onClick={() => navegarMes(1)} />
                        </div>
                        <div className="calendar-days-header">
                            {obtenerNombresDias().map(dia => (
                                <div key={dia} className="day-header">{dia}</div>
                            ))}
                        </div>
                        <div className="calendar_days_body">
                            {(() => {
                                const dias = generarDiasCalendario();
                                const filas = [];

                                // Agrupar días en filas de 7
                                for (let i = 0; i < dias.length; i += 7) {
                                    const semana = dias.slice(i, i + 7);
                                    // Verificar si algún día de la semana está seleccionado
                                    const semanaSeleccionada = semana.some(dia => dia.esDeLaSemanaSeleccionada);

                                    filas.push(
                                        <div key={`semana-${i / 7}`} className={`calendar-week ${semanaSeleccionada ? 'week-row-selected' : ''}`}>
                                            {semana.map((dia, index) => (
                                                <div
                                                    key={`${i}-${index}`}
                                                    className={`calendar-day ${dia.esMesAnterior ? 'previous-month' : ''
                                                        } ${dia.esMesSiguiente ? 'next-month' : ''
                                                        } ${dia.esHoy ? 'today' : ''
                                                        } ${dia.esSeleccionada ? 'selected' : ''
                                                        } ${dia.esDeLaSemanaSeleccionada ? 'week-selected' : ''
                                                        }`}
                                                    onClick={() => dia.esValida && manejarSeleccionFecha(dia.fecha)}
                                                >
                                                    {dia.numero}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }

                                return filas;
                            })()}
                        </div>
                    </section>

                    {/* Menus desplegables */}
                    <section className="filters">
                        <button className={`btn_expand_menus ${openMenus.filters ? 'expanded' : ''}`} onClick={() => handleToggle('filters')}>Opciones de Filtro <IoIosArrowForward className={`arrow-icon ${openMenus.filters ? 'rotated' : ''}`} /></button>
                        <div ref={filtersRef} className="filter">
                            <label><input type="checkbox" /> Reservados</label>
                            <label><input type="checkbox" /> Ocupados</label>
                            <label><input type="checkbox" /> Cancelados</label>
                            <label><input type="checkbox" /> Disponibles</label>
                        </div>
                    </section>
                    <section className="leyends">
                        <button className={`btn_expand_menus ${openMenus.leyends ? 'expanded' : ''}`} onClick={() => handleToggle('leyends')}>Leyendas <IoIosArrowForward className={`arrow-icon ${openMenus.leyends ? 'rotated' : ''}`} /></button>
                        <div ref={leyendsRef} className="leyend">
                            <label>Leyenda 1 </label>
                            <label>Leyenda 2 </label>
                            <label>Leyenda 3 </label>
                            <label>Leyenda 4 </label>
                        </div>
                    </section>
                </article>
                {/* Pie de menu lateral */}
                <article className="footer_lateral">
                    <div className="users">
                        <FaUser />
                        <FaUser />
                        <FaUser />
                    </div>
                    <CiMenuKebab className='ico_menu_footer' />
                </article>
            </aside>

            {/* Calendario de reservas */}
            <main className='reservation_main'>
                {/* Cabeca del contenido  */}
                <header className='header_main'>
                    <h4>{obtenerNombreMes(mesActual)} {mesActual.getFullYear()}</h4>
                    <div className="header_accions">
                        <aside className='svgs'>
                            <CiSearch strokeWidth={1.5} />
                            <GrCircleQuestion />
                            <GoGear strokeWidth={1} />
                        </aside>
                        <div className="line"></div>
                        <aside className='btns'>
                            <button className={deporteSeleccionado === 1 ? 'active_sport' : ''} onClick={() => handleSelectSport(1)}>Fútbol 1</button>
                            <button className={deporteSeleccionado === 2 ? 'active_sport' : ''} onClick={() => handleSelectSport(2)}>Fútbol 2</button>
                            <button className={deporteSeleccionado === 3 ? 'active_sport' : ''} onClick={() => handleSelectSport(3)}>Piscina</button>
                        </aside>
                        <div className="line"></div>
                        <aside className='btns'>
                            <button className={tipoVista === 'day' ? 'active_view' : ''} onClick={() => handleToggleView('day')}>Día</button>
                            <button className={tipoVista === 'week' ? 'active_view' : ''} onClick={() => handleToggleView('week')}>Semana</button>
                            <button className={tipoVista === 'month' ? 'active_view' : ''} onClick={() => handleToggleView('month')}>Mes</button>
                        </aside>
                    </div>
                </header>

                <section className='content_main'>
                    {vistaReseva === 1 ? (

                        <DynamicTable
                            fechaInicio={obtenerFechasDinamicas()[0]}
                            fechaFin={obtenerFechasDinamicas()[obtenerFechasDinamicas().length - 1]}
                            fechaSeleccionada={fechaSeleccionadaCalendario}
                            tipoVista={tipoVista}
                            selectReservation={selectReservation}
                            handleClickReserva={handleClickReserva}
                            reservas={[
                                {
                                    id: 1,
                                    cliente: 'Juan Pérez',
                                    fecha: '2025-08-25', // Formato yyyy-mm-dd del servidor
                                    horaInicio: '08:00',
                                    horaFin: '09:00',
                                    estado: 'confirmed'
                                },
                                {
                                    id: 2,
                                    cliente: 'María García',
                                    fecha: '2025-08-28', // Formato yyyy-mm-dd del servidor
                                    horaInicio: '14:00',
                                    horaFin: '15:45',
                                    estado: 'pending'
                                },
                                {
                                    id: 3,
                                    cliente: 'Carlos López',
                                    fecha: '2025-08-25', // Formato yyyy-mm-dd del servidor
                                    horaInicio: '16:00',
                                    horaFin: '17:00',
                                    estado: 'cancelled'

                                }
                            ]}
                            instalacion={{
                                horaApertura: '08:00',
                                horaCierre: '18:00'
                            }}
                        />
                    ) : (
                        <ReservaView2 />
                    )}

                    {/* Modal de detalles de reserva */}
                    {selectReservation && (
                        <aside className='details_block_reservation' onClick={(e) => e.stopPropagation()}>
                            <div className="header_details">
                                <FaUser /> <h4>Detalles de la reserva</h4>
                            </div>
                            <div className="body_deatils">
                                <p>{selectReservation.cliente} </p>
                            </div>

                            <div className="btns">
                                <button>Save</button>
                                <button>Cancer</button>
                            </div>
                        </aside>
                    )}
                </section>
                <footer style={{ height: 10 }}></footer>
            </main>
        </div>
    )
}

export default Reservas;