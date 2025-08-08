// Contexto de Reservas - Maneja el estado global del módulo de reservas
// 
// Este contexto proporciona funcionalidades para:
// - Gestión de horarios seleccionados
// - Navegación del calendario
// - Cálculos de precios
// - Validación de fechas
// - Agrupación de horarios por fecha

import React, { createContext, useContext, useState } from 'react';
import { esFechaValida } from '../data/horarios';
import { obtenerHorariosPorDia } from '../data/horariosApi';

// Contexto para el manejo del estado de reservas
// Proporciona acceso a funciones y estados relacionados con las reservas
const ReservationContext = createContext();

// Hook personalizado para acceder al contexto de reservas
// Retorna: Objeto con todas las funciones y estados del contexto
// Error: Si se usa fuera del ReservationProvider
// Ejemplo: const { horariosSeleccionados, agregarHorario } = useReservationContext();
export const useReservationContext = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error('useReservationContext debe ser usado dentro de ReservationProvider');
    }
    return context;
};

// Proveedor del contexto de reservas
// Envuelve la aplicación y proporciona acceso al estado de reservas
// Props: children - Componentes hijos que tendrán acceso al contexto
// Ejemplo: <ReservationProvider><App /></ReservationProvider>
export const ReservationProvider = ({ children }) => {
    // Estados principales del módulo de reservas
    
    // Lista de horarios seleccionados por el usuario
    const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
    
    // Fecha seleccionada para la reserva (formato YYYY-MM-DD)
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    
    // Mes actual mostrado en el calendario
    const [mesActual, setMesActual] = useState(new Date());
    
    // Fecha seleccionada en el calendario
    const [fechaSeleccionadaCalendario, setFechaSeleccionadaCalendario] = useState(null);

    // ==================== FUNCIONES DE GESTIÓN DE HORARIOS ====================
    
    // Genera los horarios disponibles para una fecha específica
    // Consulta la API simulada para obtener horarios y disponibilidad
    // Parámetro: fecha - Fecha en formato YYYY-MM-DD
    // Retorna: Array de objetos horario con disponibilidad y precios
    // Ejemplo: const horarios = await generarHorariosDia('2024-01-15');
    const generarHorariosDia = async (fecha) => {
        try {
            const horariosApi = await obtenerHorariosPorDia(fecha);
            return horariosApi;
        } catch (error) {
            console.error('Error al generar horarios:', error);
            return [];
        }
    };

    // Agrega un horario a la lista de seleccionados
    // Solo permite agregar horarios disponibles y no duplicados
    // Parámetro: horario - Objeto horario a agregar con id, disponible, etc.
    // Ejemplo: agregarHorario({ id: 'h1', hora: '09:00', disponible: true, precio: 25 });
    const agregarHorario = (horario) => {
        const yaSeleccionado = horariosSeleccionados.find(h => h.id === horario.id);
        if (!yaSeleccionado && horario.disponible) {
            setHorariosSeleccionados(prev => [...prev, horario]);
        }
    };

    // Remueve un horario de la lista de seleccionados
    // Parámetro: horarioId - ID del horario a remover
    // Ejemplo: removerHorario('h1');
    const removerHorario = (horarioId) => {
        setHorariosSeleccionados(prev => prev.filter(h => h.id !== horarioId));
    };
    
    // Verifica si un horario específico está seleccionado
    // Parámetro: horarioId - ID del horario a verificar
    // Retorna: true si el horario está seleccionado
    // Ejemplo: const seleccionado = estaSeleccionado('h1');
    const estaSeleccionado = (horarioId) => {
        return horariosSeleccionados.some(h => h.id === horarioId);
    };

    // ==================== FUNCIONES DE CÁLCULO Y UTILIDADES ====================
    
    // Calcula el precio total de todos los horarios seleccionados
    // Retorna: Precio total en la moneda configurada
    // Ejemplo: const total = calcularPrecioTotal(); // 75 (si hay 3 horarios de $25 cada uno)
    const calcularPrecioTotal = () => {
        return horariosSeleccionados.reduce((total, horario) => total + horario.precio, 0);
    };
    
    // Limpia todas las selecciones de horarios y fechas
    // Resetea el estado a su valor inicial
    // Ejemplo: limpiarSelecciones(); // Limpia horarios y fecha seleccionada
    const limpiarSelecciones = () => {
        setHorariosSeleccionados([]);
        setFechaSeleccionada(null);
    };

    // Agrupa los horarios seleccionados por fecha
    // Útil para mostrar reservas organizadas por día
    // Retorna: Objeto con fechas como claves y arrays de horarios como valores
    // Ejemplo: const grupos = agruparHorariosPorFecha();
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

    // Calcula el total de horas seleccionadas
    // Cada horario representa una hora de reserva
    // Tipo: Número total de horas seleccionadas
    const totalHorasSeleccionadas = horariosSeleccionados.length;

    // ==================== FUNCIONES DEL CALENDARIO ====================
    
    // Genera la estructura de días para el calendario mensual
    // Incluye días del mes anterior, actual y validaciones de disponibilidad
    // Retorna: Array de objetos día con propiedades de estado
    // Ejemplo: const dias = generarDiasCalendario();
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

    // Maneja la selección de una fecha en el calendario
    // Solo permite seleccionar fechas válidas (no pasadas y disponibles)
    // Parámetro: fecha - Fecha seleccionada por el usuario
    // Ejemplo: manejarSeleccionFechaCalendario(new Date('2024-01-15'));
    const manejarSeleccionFechaCalendario = (fecha) => {
        if (!esFechaValida(new Date(fecha))) return;
        setFechaSeleccionadaCalendario(fecha);
    };

    // Navega entre meses en el calendario
    // Parámetro: direccion - Dirección de navegación (1 para siguiente, -1 para anterior)
    // Ejemplo: navegarMes(1); // Ir al mes siguiente, navegarMes(-1); // Ir al mes anterior
    const navegarMes = (direccion) => {
        const nuevoMes = new Date(mesActual);
        nuevoMes.setMonth(mesActual.getMonth() + direccion);
        setMesActual(nuevoMes);
    };

    // ==================== FUNCIONES DE FORMATO Y UTILIDADES ====================
    
    // Obtiene el nombre del mes en español
    // Parámetro: fecha - Fecha de la cual obtener el nombre del mes
    // Retorna: Nombre del mes en español
    // Ejemplo: obtenerNombreMes(new Date(2024, 0, 15)); // "enero"
    const obtenerNombreMes = (fecha) => {
        return fecha.toLocaleDateString('es-ES', { month: 'long' });
    };
    
    // Obtiene los nombres abreviados de los días de la semana
    // Retorna: Array con nombres de días en español
    // Ejemplo: obtenerNombresDias(); // ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]
    const obtenerNombresDias = () => {
        const dias = [];
        const fecha = new Date(2024, 0, 7); // Domingo
        for (let i = 0; i < 7; i++) {
            dias.push(fecha.toLocaleDateString('es-ES', { weekday: 'short' }));
            fecha.setDate(fecha.getDate() + 1);
        }
        return dias;
    };

    // Limpia la selección actual del calendario
    // Resetea la fecha seleccionada a null
    // Ejemplo: limpiarSeleccionCalendario(); // fechaSeleccionadaCalendario = null
    const limpiarSeleccionCalendario = () => {
        setFechaSeleccionadaCalendario(null);
    };
    
    // ==================== VALOR DEL CONTEXTO ====================
    
    // Objeto que contiene todos los estados y funciones del contexto de reservas
    // Este valor se proporciona a todos los componentes hijos a través del contexto
    const value = {
        // ===== ESTADOS Y FUNCIONES DE HORARIOS =====
        horariosSeleccionados,              // Lista de horarios seleccionados
        fechaSeleccionada,                  // Fecha seleccionada para la reserva
        setFechaSeleccionada,              // Setter para la fecha seleccionada
        generarHorariosDia,                // Genera horarios disponibles para una fecha
        agregarHorario,                    // Agrega un horario a la selección
        removerHorario,                    // Remueve un horario de la selección
        estaSeleccionado,                  // Verifica si un horario está seleccionado
        calcularPrecioTotal,               // Calcula el precio total de horarios seleccionados
        limpiarSelecciones,                // Limpia todas las selecciones
        agruparHorariosPorFecha,           // Agrupa horarios por fecha
        totalHorasSeleccionadas,           // Total de horas seleccionadas
        
        // ===== ESTADOS Y FUNCIONES DEL CALENDARIO =====
        mesActual,                         // Mes actual mostrado en el calendario
        fechaSeleccionadaCalendario,       // Fecha seleccionada en el calendario
        generarDiasCalendario,             // Genera la estructura de días del calendario
        manejarSeleccionFechaCalendario,   // Maneja la selección de fecha en el calendario
        navegarMes,                        // Navega entre meses del calendario
        obtenerNombreMes,                  // Obtiene el nombre del mes en español
        obtenerNombresDias,                // Obtiene nombres de días de la semana
        limpiarSeleccionCalendario         // Limpia la selección del calendario
    };

    return (
        <ReservationContext.Provider value={value}>
            {children}
        </ReservationContext.Provider>
    );
};