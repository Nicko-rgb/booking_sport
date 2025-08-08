import React, { createContext, useContext, useState } from 'react';
import { esFechaValida } from '../data/horarios';
import { obtenerHorariosPorDia } from '../data/horariosApi';

// Crear el contexto
const ReservationContext = createContext();

// Hook para usar el contexto
export const useReservationContext = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error('useReservationContext debe ser usado dentro de ReservationProvider');
    }
    return context;
};

// Proveedor del contexto
export const ReservationProvider = ({ children }) => {
    const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [mesActual, setMesActual] = useState(new Date());
    const [fechaSeleccionadaCalendario, setFechaSeleccionadaCalendario] = useState(null);

    // Generar horarios del día usando datos de la API simulada
    const generarHorariosDia = async (fecha) => {
        try {
            const horariosApi = await obtenerHorariosPorDia(fecha);
            return horariosApi;
        } catch (error) {
            console.error('Error al generar horarios:', error);
            return [];
        }
    };

    // Agregar horario seleccionado
    const agregarHorario = (horario) => {
        const yaSeleccionado = horariosSeleccionados.find(h => h.id === horario.id);
        if (!yaSeleccionado && horario.disponible) {
            setHorariosSeleccionados(prev => [...prev, horario]);
        }
    };

    // Remover horario seleccionado
    const removerHorario = (horarioId) => {
        setHorariosSeleccionados(prev => prev.filter(h => h.id !== horarioId));
    };
    
    // Verificar si un horario está seleccionado
    const estaSeleccionado = (horarioId) => {
        return horariosSeleccionados.some(h => h.id === horarioId);
    };

    // Calcular precio total
    const calcularPrecioTotal = () => {
        return horariosSeleccionados.reduce((total, horario) => total + horario.precio, 0);
    };
    
    // Limpiar todas las selecciones
    const limpiarSelecciones = () => {
        setHorariosSeleccionados([]);
        setFechaSeleccionada(null);
    };

    // Agrupar horarios por fecha
    const agruparHorariosPorFecha = () => {
        const grupos = {};
        horariosSeleccionados.forEach(horario => {
            const fechaKey = horario.fecha.toISOString().split('T')[0];
            if (!grupos[fechaKey]) {
                grupos[fechaKey] = [];
            }
            grupos[fechaKey].push(horario);
        });
        return grupos;
    };

    // Calcular total de horas seleccionadas
    const totalHorasSeleccionadas = horariosSeleccionados.length;

    // Funciones del calendario
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
        const mesAnterior = new Date(año, mes - 1, 0);
        const diasMesAnterior = mesAnterior.getDate();
        for (let i = primerDiaSemana - 1; i >= 0; i--) {
            const dia = diasMesAnterior - i;
            const fecha = new Date(año, mes - 1, dia);
            fecha.setHours(0, 0, 0, 0);
            
            dias.push({
                numero: dia,
                fecha: fecha,
                esValida: false,
                esHoy: false,
                esSeleccionada: false,
                esFechaPasada: true,
                esMesAnterior: true
            });
        }

        // Agregar días del mes actual
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
                esSeleccionada: fechaSeleccionadaCalendario && fecha.toDateString() === fechaSeleccionadaCalendario.toDateString(),
                esFechaPasada: esFechaPasada,
                esMesAnterior: false
            });
        }

        return dias;
    };

    // Manejar selección de fecha en el calendario
    const manejarSeleccionFechaCalendario = (fecha) => {
        if (!esFechaValida(new Date(fecha))) return;
        setFechaSeleccionadaCalendario(fecha);
    };

    // Navegar meses
    const navegarMes = (direccion) => {
        const nuevoMes = new Date(mesActual);
        nuevoMes.setMonth(mesActual.getMonth() + direccion);
        setMesActual(nuevoMes);
    };

    // Obtener nombres de meses y días
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

    // Limpiar selección del calendario
    const limpiarSeleccionCalendario = () => {
        setFechaSeleccionadaCalendario(null);
    };
    
    const value = {
        // Estados y funciones de horarios
        horariosSeleccionados,
        fechaSeleccionada,
        setFechaSeleccionada,
        generarHorariosDia,
        agregarHorario,
        removerHorario,
        estaSeleccionado,
        calcularPrecioTotal,
        limpiarSelecciones,
        agruparHorariosPorFecha,
        totalHorasSeleccionadas,
        
        // Estados y funciones del calendario
        mesActual,
        fechaSeleccionadaCalendario,
        generarDiasCalendario,
        manejarSeleccionFechaCalendario,
        navegarMes,
        obtenerNombreMes,
        obtenerNombresDias,
        limpiarSeleccionCalendario
    };

    return (
        <ReservationContext.Provider value={value}>
            {children}
        </ReservationContext.Provider>
    );
};