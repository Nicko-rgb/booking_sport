// Simulación de datos de horarios que vendrían de una API
// Precios diferenciados: Lunes-Viernes vs Sábados-Domingos

export const horarios = {
    lunes: [
        { id: 1, hora: "08:00 - 09:00", precio: 20, estado: 'disponible' },
        { id: 2, hora: "09:00 - 10:00", precio: 20, estado: 'mantenimiento' },
        { id: 3, hora: "16:00 - 17:00", precio: 30, estado: 'disponible' },
        { id: 4, hora: "17:00 - 18:00", precio: 35, estado: 'mantenimiento' },
        { id: 5, hora: "18:00 - 19:00", precio: 40, estado: 'disponible' },
        { id: 6, hora: "19:00 - 20:00", precio: 40, estado: 'ocupado' },
        { id: 2, hora: "09:00 - 10:00", precio: 20, estado: 'mantenimiento' },
        { id: 3, hora: "16:00 - 17:00", precio: 30, estado: 'disponible' },
        { id: 4, hora: "17:00 - 18:00", precio: 35, estado: 'mantenimiento' },
        { id: 5, hora: "18:00 - 19:00", precio: 40, estado: 'disponible' },
        { id: 6, hora: "19:00 - 20:00", precio: 40, estado: 'ocupado' },
        { id: 2, hora: "09:00 - 10:00", precio: 20, estado: 'mantenimiento' },
        { id: 3, hora: "16:00 - 17:00", precio: 30, estado: 'disponible' },
        { id: 4, hora: "17:00 - 18:00", precio: 35, estado: 'mantenimiento' },
        { id: 5, hora: "18:00 - 19:00", precio: 40, estado: 'disponible' },
        { id: 6, hora: "19:00 - 20:00", precio: 40, estado: 'ocupado' },
    ],
    martes: [
        { id: 1, hora: "09:00 - 10:00", precio: 20, estado: 'mantenimiento' },
        { id: 2, hora: "10:00 - 11:00", precio: 20, estado: 'disponible' },
        { id: 3, hora: "11:00 - 12:00", precio: 25, estado: 'disponible' },
        { id: 4, hora: "18:00 - 19:00", precio: 35, estado: 'ocupado' },
        { id: 5, hora: "19:00 - 20:00", precio: 40, estado: 'ocupado' },
        { id: 6, hora: "20:00 - 21:00", precio: 45, estado: 'mantenimiento' },
    ],
    miercoles: [
        { id: 1, hora: "08:00 - 09:00", precio: 20, estado: 'ocupado' },
        { id: 2, hora: "09:00 - 10:00", precio: 20, estado: 'ocupado' },
        { id: 3, hora: "17:00 - 18:00", precio: 30, estado: 'disponible' },
        { id: 4, hora: "18:00 - 19:00", precio: 35, estado: 'disponible' },
        { id: 5, hora: "19:00 - 20:00", precio: 40, estado: 'disponible' },
        { id: 6, hora: "20:00 - 21:00", precio: 40, estado: 'disponible' },
    ],
    jueves: [
        { id: 1, hora: "08:30 - 09:30", precio: 20, estado: 'mantenimiento' },
        { id: 2, hora: "13:00 - 14:00", precio: 20, estado: 'mantenimiento' },
        { id: 3, hora: "19:00 - 20:00", precio: 30, estado: 'mantenimiento' },
        { id: 4, hora: "20:00 - 21:00", precio: 40, estado: 'disponible' },
        { id: 5, hora: "21:00 - 22:00", precio: 40, estado: 'disponible' },
    ],
    viernes: [
        { id: 1, hora: "08:30 - 09:30", precio: 20, estado: 'ocupado' },
        { id: 2, hora: "13:00 - 14:00", precio: 20, estado: 'ocupado' },
        { id: 3, hora: "19:00 - 20:00", precio: 30, estado: 'disponible' },
        { id: 4, hora: "20:00 - 21:00", precio: 40, estado: 'disponible' },
        { id: 5, hora: "21:00 - 22:00", precio: 40, estado: 'disponible' },
    ],
    sabado: [
        { id: 1, hora: "10:00 - 11:00", precio: 30, estado: 'disponible' },
        { id: 2, hora: "14:00 - 15:00", precio: 35, estado: 'disponible' },
        { id: 3, hora: "15:00 - 16:00", precio: 45, estado: 'disponible' },
        { id: 4, hora: "16:00 - 17:00", precio: 50, estado: 'disponible' },
        { id: 5, hora: "17:00 - 18:00", precio: 40, estado: 'disponible' },
        { id: 6, hora: "18:00 - 19:00", precio: 40, estado: 'disponible' },
        { id: 7, hora: "19:00 - 20:00", precio: 45, estado: 'mantenimiento' },
        { id: 8, hora: "20:00 - 21:00", precio: 40, estado: 'mantenimiento' },
    ],
    domingo: [
        { id: 1, hora: "10:00 - 11:00", precio: 30, estado: 'ocupado' },
        { id: 2, hora: "14:00 - 15:00", precio: 35, estado: 'ocupado' },
        { id: 3, hora: "15:00 - 16:00", precio: 45, estado: 'disponible' },
        { id: 4, hora: "16:00 - 17:00", precio: 50, estado: 'disponible' },
        { id: 5, hora: "17:00 - 18:00", precio: 40, estado: 'ocupado' },
        { id: 6, hora: "18:00 - 19:00", precio: 40, estado: 'ocupado' },
        { id: 7, hora: "19:00 - 20:00", precio: 45, estado: 'disponible' },
        { id: 8, hora: "20:00 - 21:00", precio: 40, estado: 'disponible' }
    ]
};

// Función para obtener horarios por día de la semana
export const obtenerHorariosPorDia = (fecha) => {
    const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaSemana = diasSemana[fecha.getDay()];
    
    const horariosDelDia = horarios[diaSemana] || [];
    
    // Simular delay de API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(horariosDelDia.map(horario => ({
                ...horario,
                id: `${fecha.toISOString().split('T')[0]}-${horario.id}`,
                fecha: new Date(fecha),
                disponible: horario.estado === 'disponible',
                horaDisplay: horario.hora
            })));
        }, 500);
    });
};
