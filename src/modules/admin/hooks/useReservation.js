import React, {useState} from 'react';

const useReservation = () => {

    // Estados para el calendario
    const [mesActual, setMesActual] = useState(new Date());
    const [fechaSeleccionadaCalendario, setFechaSeleccionadaCalendario] = useState(new Date());
    const [vistaReseva, setVistaReserva] = useState(2);
    const [tipoVista, setTipoVista] = useState('week');
    const [deporteSeleccionado, setDeporteSeleccionado] = useState(1);
    const [selectReservation, setSelectReservation] = useState(null);
    const [semanaSeleccionada, setSemanaSeleccionada] = useState(() => {
        const hoy = new Date();
        const dia = hoy.getDay();
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - dia);
        inicioSemana.setHours(0, 0, 0, 0);
        return inicioSemana;
    });

    // Función para validar fechas (solo permite fechas del mes actual)
    const esFechaValida = (fecha) => {
        const fechaMes = fecha.getMonth();
        const fechaAño = fecha.getFullYear();
        const mesActualMes = mesActual.getMonth();
        const mesActualAño = mesActual.getFullYear();
        
        // Solo permitir fechas que pertenezcan al mes y año actual seleccionado
        return fechaMes === mesActualMes && fechaAño === mesActualAño;
    };

    // Genera la estructura de días para el calendario mensual
    const generarDiasCalendario = () => {
        const año = mesActual.getFullYear();
        const mes = mesActual.getMonth();
        const primerDia = new Date(año, mes, 1);
        const ultimoDia = new Date(año, mes + 1, 0);
        const primerDiaSemana = primerDia.getDay();
        const diasEnMes = ultimoDia.getDate();
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const dias = [];

        // Agregar días del mes anterior para completar la primera semana
        const diasMesAnterior = new Date(año, mes, 0).getDate();
        for (let i = primerDiaSemana - 1; i >= 0; i--) {
            const dia = diasMesAnterior - i;
            const fecha = new Date(año, mes - 1, dia);
            fecha.setHours(0, 0, 0, 0);
            
            dias.push({
                numero: dia,
                fecha: fecha,
                esValida: false, // Los días del mes anterior no son seleccionables
                esHoy: false,
                esSeleccionada: false, // Los días del mes anterior no pueden estar seleccionados
                esFechaPasada: fecha < hoy,
                esMesAnterior: true,
                esDeLaSemanaSeleccionada: esDeLaSemanaSeleccionada(fecha)
            });
        }

        // Agregar días del mes actual
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fecha = new Date(año, mes, dia);
            fecha.setHours(0, 0, 0, 0);
            
            const esFechaPasada = fecha < hoy;
            const esFechaValidaHoy = esFechaValida(new Date(fecha));
            
            dias.push({
                numero: dia,
                fecha: fecha,
                esValida: esFechaValidaHoy,
                esHoy: fecha.getTime() === hoy.getTime(),
                esSeleccionada: fechaSeleccionadaCalendario && fecha.toDateString() === fechaSeleccionadaCalendario.toDateString(),
                esFechaPasada: esFechaPasada,
                esMesAnterior: false,
                esDeLaSemanaSeleccionada: esDeLaSemanaSeleccionada(fecha)
            });
        }
        return dias;
    };

    // Función para navegar entre meses
    const navegarMes = (direccion) => {
        setMesActual(prev => {
            const nuevaFecha = new Date(prev);
            nuevaFecha.setMonth(prev.getMonth() + direccion);
            return nuevaFecha;
        });
        
        // Seleccionar automáticamente el primer día del nuevo mes
        const primerDiaDelMes = new Date(mesActual);
        primerDiaDelMes.setMonth(mesActual.getMonth() + direccion);
        primerDiaDelMes.setDate(1);
        
        setFechaSeleccionadaCalendario(primerDiaDelMes);
        
        // También actualizar la semana seleccionada
        const inicioSemana = obtenerInicioSemana(primerDiaDelMes);
        setSemanaSeleccionada(inicioSemana);
    };

    // Función para obtener el nombre del mes
    const obtenerNombreMes = (fecha) => {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[fecha.getMonth()];
    };

    // Función para obtener nombres de días de la semana
    const obtenerNombresDias = () => {
        return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    };

    // Función para manejar selección de fecha
    const manejarSeleccionFecha = (fecha) => {
        setFechaSeleccionadaCalendario(fecha);
        // También seleccionar la semana de esta fecha
        const inicioSemana = obtenerInicioSemana(fecha);
        setSemanaSeleccionada(inicioSemana);
    };

    // Función para obtener el inicio de la semana (domingo)
    const obtenerInicioSemana = (fecha) => {
        const nuevaFecha = new Date(fecha);
        const dia = nuevaFecha.getDay();
        nuevaFecha.setDate(nuevaFecha.getDate() - dia);
        nuevaFecha.setHours(0, 0, 0, 0);
        return nuevaFecha;
    };

    // Función para obtener las fechas de la semana seleccionada
    const obtenerFechasSemana = () => {
        if (!semanaSeleccionada) return [];
        
        const fechas = [];
        for (let i = 0; i < 7; i++) {
            const fecha = new Date(semanaSeleccionada);
            fecha.setDate(semanaSeleccionada.getDate() + i);
            fechas.push(fecha);
        }
        return fechas;
    };

    // Función para obtener solo la fecha seleccionada (vista día)
    const obtenerFechaDia = () => {
        return [fechaSeleccionadaCalendario];
    };

    // Función para obtener todas las fechas del mes actual
    const obtenerFechasMes = () => {
        const año = mesActual.getFullYear();
        const mes = mesActual.getMonth();
        const diasEnMes = new Date(año, mes + 1, 0).getDate();
        
        const fechas = [];
        for (let i = 1; i <= diasEnMes; i++) {
            const fecha = new Date(año, mes, i);
            fechas.push(fecha);
        }
        return fechas;
    };

    // Función para obtener fechas dinámicamente según el tipo de vista
    const obtenerFechasDinamicas = () => {
        switch (tipoVista) {
            case 'day':
                return obtenerFechaDia();
            case 'week':
                return obtenerFechasSemana();
            case 'month':
                return obtenerFechasMes();
            default:
                return obtenerFechasSemana();
        }
    };

    // Función para generar horarios cada hora (12 horas)
    const generarHorarios = () => {
        const horarios = [];
        for (let i = 8; i < 18; i++) { // De 8:00 AM a 7:00 PM (12 horas)
            const hora = i.toString().padStart(2, '0') + ':00';
            horarios.push(hora);
        }
        return horarios;
    };

    // Función para verificar si una fecha pertenece a la semana seleccionada
    const esDeLaSemanaSeleccionada = (fecha) => {
        if (!semanaSeleccionada) return false;
        const inicioSemana = obtenerInicioSemana(fecha);
        return inicioSemana.getTime() === semanaSeleccionada.getTime();
    };

    // Esta y funcion para abrir los menus del menu lateral
    const [openMenus, setOpenMenus] = useState({});
    const handleClickOpenMenu = (items) => {
        setOpenMenus(prev => ({
            ...prev,
            [items]: !prev[items]
        }));
    }

    // Funcion para expandir el menu lateral de los menus
    const toggleContent = (el) => {
        if (el.style.height && el.style.height !== "0px") {
            // Contraer
            el.style.height = el.scrollHeight + "px"; // aseguramos altura inicial
            requestAnimationFrame(() => {
                el.style.height = "0px"; // colapsa
            });
        } else {
            // Expandir
            el.style.height = el.scrollHeight + "px";

            // cuando termine, dejamos height en auto para adaptarse a cambios
            el.addEventListener(
                "transitionend",
                () => {
                    el.style.height = "auto";
                },
                { once: true }
            );
        }
    }

    // Funcion para cambiar el tipo de vista de reservas
    const handleToggleViewReserva = () => {
        if (vistaReseva == 1) {
            setVistaReserva(2)
        } else {
            setVistaReserva(1)
        }
    }
    // Funcion para cambiar de tipo de vista de la tabla reservas
    const handleToggleView = (vista) => {
        setTipoVista(vista)
    }

    // Funcion para cambiar de tipo de deporte que tiene la instalacion deportiva
    const handleSelectSport = (sport) => {
        setDeporteSeleccionado(sport)
    }

    // Funcion para seleccionar una reserva y ver mas detalles
    const handleClickReserva = (reserva) => {
        // Si no hay reserva seleccionada o es diferente, seleccionar la nueva
        if (!selectReservation || selectReservation.id !== reserva?.id) {
            setSelectReservation(reserva);
        } else {
            // Si es la misma reserva, deseleccionar
            setSelectReservation(null);
        }
    }

    return {
        // Estados
        openMenus,
        mesActual,
        fechaSeleccionadaCalendario,
        semanaSeleccionada,
        vistaReseva,
        tipoVista,
        deporteSeleccionado,
        selectReservation,
        setSelectReservation,

        // Funciones
        generarDiasCalendario,
        navegarMes,
        obtenerNombreMes,
        obtenerNombresDias,
        manejarSeleccionFecha,
        obtenerFechasSemana,
        obtenerFechasDinamicas,
        generarHorarios,
        esDeLaSemanaSeleccionada,
        handleClickOpenMenu,
        toggleContent,
        handleToggleViewReserva,
        handleToggleView,
        handleSelectSport,
        handleClickReserva,
    }
}

export default useReservation