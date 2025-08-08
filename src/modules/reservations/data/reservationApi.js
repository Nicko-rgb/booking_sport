// API simulada para el módulo de reservas
// Este archivo simula las llamadas al servidor para el manejo de reservas

// Datos simulados de horarios disponibles
const mockTimeSlots = [
    { id: 'ts1', time: '08:00', available: true, price: 25 },
    { id: 'ts2', time: '09:00', available: true, price: 25 },
    { id: 'ts3', time: '10:00', available: false, price: 25 },
    { id: 'ts4', time: '11:00', available: true, price: 30 },
    { id: 'ts5', time: '12:00', available: true, price: 30 },
    { id: 'ts6', time: '13:00', available: false, price: 30 },
    { id: 'ts7', time: '14:00', available: true, price: 35 },
    { id: 'ts8', time: '15:00', available: true, price: 35 },
    { id: 'ts9', time: '16:00', available: true, price: 35 },
    { id: 'ts10', time: '17:00', available: true, price: 40 },
    { id: 'ts11', time: '18:00', available: true, price: 40 },
    { id: 'ts12', time: '19:00', available: false, price: 40 },
    { id: 'ts13', time: '20:00', available: true, price: 45 },
    { id: 'ts14', time: '21:00', available: true, price: 45 },
    { id: 'ts15', time: '22:00', available: true, price: 40 }
];

// Datos simulados de reservas existentes
const mockReservations = [
    {
        id: 'res1',
        facilityId: 1,
        facilityName: 'Complejo Deportivo San Martín',
        userId: 'user1',
        userName: 'Juan Pérez',
        date: '2024-01-15',
        timeSlots: ['10:00', '11:00'],
        totalPrice: 55,
        paymentMethod: 'credit-card',
        paymentStatus: 'completed',
        status: 'confirmed',
        createdAt: '2024-01-10T10:30:00Z',
        updatedAt: '2024-01-10T10:30:00Z'
    },
    {
        id: 'res2',
        facilityId: 2,
        facilityName: 'Arena Sport Club',
        userId: 'user2',
        userName: 'María García',
        date: '2024-01-16',
        timeSlots: ['18:00', '19:00'],
        totalPrice: 80,
        paymentMethod: 'paypal',
        paymentStatus: 'completed',
        status: 'confirmed',
        createdAt: '2024-01-11T14:20:00Z',
        updatedAt: '2024-01-11T14:20:00Z'
    },
    {
        id: 'res3',
        facilityId: 1,
        facilityName: 'Complejo Deportivo San Martín',
        userId: 'user3',
        userName: 'Carlos López',
        date: '2024-01-17',
        timeSlots: ['20:00'],
        totalPrice: 45,
        paymentMethod: 'mobile-payment',
        paymentStatus: 'pending',
        status: 'pending',
        createdAt: '2024-01-12T16:45:00Z',
        updatedAt: '2024-01-12T16:45:00Z'
    }
];

// Simular delay de red
const simulateNetworkDelay = (min = 500, max = 1500) => {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
};

// Simular posibles errores de red
const simulateNetworkError = (errorRate = 0.05) => {
    if (Math.random() < errorRate) {
        throw new Error('Error de conexión con el servidor');
    }
};

// Generar ID único para nuevas reservas
const generateReservationId = () => {
    return 'res' + Date.now() + Math.random().toString(36).substr(2, 9);
};

// API Functions

/**
 * Obtener horarios disponibles para una fecha y instalación específica
 * @param {string} facilityId - ID de la instalación
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @returns {Promise<Array>} Lista de horarios disponibles
 */
export const obtenerHorariosPorDia = async (facilityId, date) => {
    await simulateNetworkDelay();
    simulateNetworkError();

    // Simular diferentes disponibilidades según la fecha
    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // En fines de semana, algunos horarios están más ocupados
    const timeSlots = mockTimeSlots.map(slot => {
        let available = slot.available;

        if (isWeekend) {
            // Reducir disponibilidad en fines de semana
            if (['10:00', '11:00', '16:00', '17:00', '18:00'].includes(slot.time)) {
                available = Math.random() > 0.6;
            }
        }

        // Verificar si ya hay reservas para este horario
        const existingReservation = mockReservations.find(res =>
            res.facilityId == facilityId &&
            res.date === date &&
            res.timeSlots.includes(slot.time) &&
            res.status === 'confirmed'
        );

        if (existingReservation) {
            available = false;
        }

        return {
            ...slot,
            available,
            date: date,
            facilityId: facilityId
        };
    });

    return timeSlots;
};

/**
 * Crear una nueva reserva
 * @param {Object} reservationData - Datos de la reserva
 * @returns {Promise<Object>} Reserva creada
 */
export const crearReserva = async (reservationData) => {
    await simulateNetworkDelay(1000, 2500);
    simulateNetworkError(0.03); // 3% de probabilidad de error

    const newReservation = {
        id: generateReservationId(),
        ...reservationData,
        paymentStatus: 'completed',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Simular guardado en "base de datos"
    mockReservations.push(newReservation);

    return newReservation;
};

/**
 * Obtener todas las reservas de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Lista de reservas del usuario
 */
export const obtenerReservasUsuario = async (userId) => {
    await simulateNetworkDelay();
    simulateNetworkError();

    const userReservations = mockReservations.filter(res => res.userId === userId);

    // Ordenar por fecha de creación (más recientes primero)
    return userReservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

/**
 * Obtener todas las reservas (para administradores)
 * @param {Object} filters - Filtros opcionales
 * @returns {Promise<Array>} Lista de todas las reservas
 */
export const obtenerTodasLasReservas = async (filters = {}) => {
    await simulateNetworkDelay();
    simulateNetworkError();

    let reservations = [...mockReservations];

    // Aplicar filtros si existen
    if (filters.facilityId) {
        reservations = reservations.filter(res => res.facilityId == filters.facilityId);
    }

    if (filters.date) {
        reservations = reservations.filter(res => res.date === filters.date);
    }

    if (filters.status) {
        reservations = reservations.filter(res => res.status === filters.status);
    }

    // Ordenar por fecha de creación (más recientes primero)
    return reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

/**
 * Cancelar una reserva
 * @param {string} reservationId - ID de la reserva
 * @returns {Promise<Object>} Reserva cancelada
 */
export const cancelarReserva = async (reservationId) => {
    await simulateNetworkDelay();
    simulateNetworkError();

    const reservationIndex = mockReservations.findIndex(res => res.id === reservationId);

    if (reservationIndex === -1) {
        throw new Error('Reserva no encontrada');
    }

    const reservation = mockReservations[reservationIndex];

    // Verificar si la reserva se puede cancelar
    const reservationDate = new Date(reservation.date);
    const now = new Date();
    const timeDiff = reservationDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 24) {
        throw new Error('No se puede cancelar una reserva con menos de 24 horas de anticipación');
    }

    // Actualizar estado de la reserva
    mockReservations[reservationIndex] = {
        ...reservation,
        status: 'cancelled',
        paymentStatus: 'refunded',
        updatedAt: new Date().toISOString()
    };

    return mockReservations[reservationIndex];
};

/**
 * Obtener estadísticas de reservas
 * @returns {Promise<Object>} Estadísticas
 */
export const obtenerEstadisticasReservas = async () => {
    await simulateNetworkDelay();
    simulateNetworkError();

    const totalReservations = mockReservations.length;
    const confirmedReservations = mockReservations.filter(res => res.status === 'confirmed').length;
    const pendingReservations = mockReservations.filter(res => res.status === 'pending').length;
    const cancelledReservations = mockReservations.filter(res => res.status === 'cancelled').length;

    const totalRevenue = mockReservations
        .filter(res => res.paymentStatus === 'completed')
        .reduce((sum, res) => sum + res.totalPrice, 0);

    return {
        totalReservations,
        confirmedReservations,
        pendingReservations,
        cancelledReservations,
        totalRevenue,
        averageReservationValue: totalReservations > 0 ? totalRevenue / totalReservations : 0
    };
};

/**
 * Verificar disponibilidad de horarios
 * @param {string} facilityId - ID de la instalación
 * @param {string} date - Fecha
 * @param {Array} timeSlots - Lista de horarios a verificar
 * @returns {Promise<Object>} Resultado de la verificación
 */
export const verificarDisponibilidad = async (facilityId, date, timeSlots) => {
    await simulateNetworkDelay(300, 800);
    simulateNetworkError();

    const availableSlots = await obtenerHorariosPorDia(facilityId, date);
    const unavailableSlots = [];

    timeSlots.forEach(requestedTime => {
        const slot = availableSlots.find(s => s.time === requestedTime);
        if (!slot || !slot.available) {
            unavailableSlots.push(requestedTime);
        }
    });

    return {
        available: unavailableSlots.length === 0,
        unavailableSlots,
        message: unavailableSlots.length > 0
            ? `Los siguientes horarios ya no están disponibles: ${unavailableSlots.join(', ')}`
            : 'Todos los horarios están disponibles'
    };
};

// Exportar datos mock para testing
export const mockData = {
    timeSlots: mockTimeSlots,
    reservations: mockReservations
};

// Funciones de utilidad
export const utils = {
    simulateNetworkDelay,
    simulateNetworkError,
    generateReservationId
};