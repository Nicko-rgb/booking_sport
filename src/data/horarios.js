// Datos de horarios para reservas de espacios deportivos

// Estados posibles de los horarios
export const ESTADO_HORARIO = {
  LIBRE: 'libre',
  OCUPADO: 'ocupado',
  NO_DISPONIBLE: 'no_disponible',
  MANTENIMIENTO: 'mantenimiento'
};

// Horarios base disponibles (formato 24h)
export const HORARIOS_BASE = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

// Precios por horario (en soles)
export const PRECIOS_HORARIO = {
  '06:00': 25,
  '07:00': 25,
  '08:00': 30,
  '09:00': 35,
  '10:00': 35,
  '11:00': 35,
  '12:00': 40,
  '13:00': 40,
  '14:00': 40,
  '15:00': 45,
  '16:00': 45,
  '17:00': 45,
  '18:00': 50,
  '19:00': 50,
  '20:00': 45,
  '21:00': 40,
  '22:00': 35
};

// Función para generar horarios de una fecha específica
export const generarHorariosFecha = (fecha) => {
  const fechaStr = fecha.toISOString().split('T')[0];
  const diaSemana = fecha.getDay(); // 0 = domingo, 6 = sábado
  const hora = fecha.getHours();
  
  return HORARIOS_BASE.map(horario => {
    const [horaHorario] = horario.split(':').map(Number);
    let estado = ESTADO_HORARIO.LIBRE;
    
    // Lógica para determinar el estado del horario
    
    // Horarios no disponibles los domingos antes de las 8:00
    if (diaSemana === 0 && horaHorario < 8) {
      estado = ESTADO_HORARIO.NO_DISPONIBLE;
    }
    
    // Mantenimiento los lunes de 6:00 a 8:00
    if (diaSemana === 1 && horaHorario >= 6 && horaHorario < 8) {
      estado = ESTADO_HORARIO.MANTENIMIENTO;
    }
    
    // Horarios pasados no disponibles (solo para hoy)
    const hoy = new Date();
    if (fechaStr === hoy.toISOString().split('T')[0] && horaHorario <= hora) {
      estado = ESTADO_HORARIO.NO_DISPONIBLE;
    }
    
    // Simulación de horarios ocupados (algunos horarios aleatorios)
    const horariosOcupados = getHorariosOcupados(fechaStr);
    if (horariosOcupados.includes(horario)) {
      estado = ESTADO_HORARIO.OCUPADO;
    }
    
    return {
      hora: horario,
      estado: estado,
      precio: PRECIOS_HORARIO[horario],
      disponible: estado === ESTADO_HORARIO.LIBRE
    };
  });
};

// Función para obtener horarios ocupados de una fecha (simulación)
const getHorariosOcupados = (fechaStr) => {
  // Simulación de datos - en una app real esto vendría de una API
  const horariosOcupadosPorFecha = {
    // Formato: 'YYYY-MM-DD': ['hora1', 'hora2', ...]
    '2024-12-20': ['09:00', '15:00', '18:00'],
    '2024-12-21': ['10:00', '14:00', '19:00', '20:00'],
    '2024-12-22': ['08:00', '12:00', '16:00'],
    '2024-12-23': ['11:00', '17:00', '21:00'],
    '2024-12-24': ['07:00', '13:00', '18:00', '19:00'],
    '2024-12-25': [], // Navidad - todos libres
    '2024-12-26': ['09:00', '10:00', '15:00', '16:00'],
    '2024-12-27': ['08:00', '14:00', '20:00'],
    '2024-12-28': ['12:00', '18:00', '19:00'],
    '2024-12-29': ['09:00', '11:00', '17:00'],
    '2024-12-30': ['10:00', '15:00', '21:00']
  };
  
  return horariosOcupadosPorFecha[fechaStr] || [];
};

// Función para obtener información de reserva
export const obtenerInfoReserva = (fecha, hora) => {
  const horarios = generarHorariosFecha(fecha);
  const horarioSeleccionado = horarios.find(h => h.hora === hora);
  
  if (!horarioSeleccionado) {
    return null;
  }
  
  return {
    fecha: fecha.toLocaleDateString('es-PE'),
    hora: hora,
    precio: horarioSeleccionado.precio,
    estado: horarioSeleccionado.estado,
    disponible: horarioSeleccionado.disponible,
    duracion: '1 hora',
    total: horarioSeleccionado.precio
  };
};

// Función para validar si una fecha es válida para reservas
export const esFechaValida = (fecha) => {
  const hoy = new Date();
  const maxFecha = new Date();
  maxFecha.setMonth(maxFecha.getMonth() + 3); // Máximo 3 meses adelante
  
  // Resetear horas para comparación de fechas
  hoy.setHours(0, 0, 0, 0);
  fecha.setHours(0, 0, 0, 0);
  
  return fecha >= hoy && fecha <= maxFecha;
};

export default {
  ESTADO_HORARIO,
  HORARIOS_BASE,
  PRECIOS_HORARIO,
  generarHorariosFecha,
  obtenerInfoReserva,
  esFechaValida
};