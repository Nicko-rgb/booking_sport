
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
  esFechaValida
};