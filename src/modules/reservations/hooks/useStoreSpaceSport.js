// Hook personalizado para gestionar el estado de espacios deportivos
// 
// Este hook maneja:
// - Estados de modales (calendario, horarios, resumen, pagos)
// - Galería de imágenes y navegación
// - Flujo de reservas
// - Integración con WhatsApp

import { useState, useEffect } from 'react';

// Hook personalizado para gestionar el estado y funcionalidades de espacios deportivos
// Parámetro: currentGallery - Array de URLs de imágenes de la galería
// Retorna: Objeto con estados y funciones para manejar espacios deportivos
// Ejemplo: const { calendarsOpen, manejarSeleccionFecha } = useStoreSpaceSport(galleryImages);
export const useStoreSpaceSport = (currentGallery = []) => {
    // ==================== ESTADOS DE MODALES ====================
    
    // Estado del modal de calendarios
    const [calendarsOpen, setCalendarsOpen] = useState(false);
    
    // Estado del modal de lista de horarios
    const [listTimeOpen, setListTimeOpen] = useState(false);
    
    // Estado del modal de resumen de reserva
    const [reservationSummaryOpen, setReservationSummaryOpen] = useState(false);
    
    // Estado del modal de métodos de pago
    const [paymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
    
    // ==================== ESTADOS DE RESERVA ====================
    
    // Fecha seleccionada para la reserva
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    
    // Datos de la reserva para procesar el pago
    const [reservationData, setReservationData] = useState(null);
    
    // ==================== ESTADOS DE GALERÍA ====================
    
    // URL de la imagen principal mostrada
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    
    // Índice de desplazamiento para la galería de imágenes
    const [indiceDesplazamiento, setIndiceDesplazamiento] = useState(0);

    // ==================== EFECTOS ====================
    
    /**
     * Efecto para establecer la imagen principal cuando cambia la galería
     * Se ejecuta cuando currentGallery o imagenPrincipal cambian
     */
    useEffect(() => {
        if (currentGallery.length > 0 && !currentGallery.includes(imagenPrincipal)) {
            setImagenPrincipal(currentGallery[0]);
        }
    }, [currentGallery, imagenPrincipal]);

    /**
     * Efecto para implementar carrusel automático de imágenes
     * Cambia la imagen principal cada 3 segundos
     */
    useEffect(() => {
        if (currentGallery.length === 0) return;
        
        const intervalo = setInterval(() => {
            const indiceActual = currentGallery.findIndex(img => img === imagenPrincipal);
            const siguienteIndice = (indiceActual + 1) % currentGallery.length;
            setImagenPrincipal(currentGallery[siguienteIndice]);
        }, 3000);

        return () => clearInterval(intervalo);
    }, [imagenPrincipal, currentGallery]);

    // ==================== FUNCIONES DE GALERÍA ====================

    /**
     * Maneja el desplazamiento hacia la izquierda en la galería
     * Desplaza 3 imágenes hacia la izquierda o se mantiene en 0
     */
    const manejarDesplazamientoIzquierda = () => {
        const nuevoIndice = Math.max(0, indiceDesplazamiento - 3);
        setIndiceDesplazamiento(nuevoIndice);
    };

    /**
     * Maneja el desplazamiento hacia la derecha en la galería
     * Desplaza 3 imágenes hacia la derecha sin exceder el límite
     */
    const manejarDesplazamientoDerecha = () => {
        const maxIndice = Math.max(0, currentGallery.length - 3);
        const nuevoIndice = Math.min(maxIndice, indiceDesplazamiento + 3);
        setIndiceDesplazamiento(nuevoIndice);
    };

    // ==================== FUNCIONES DE NAVEGACIÓN ====================

    /**
     * Redirige a WhatsApp con un mensaje predefinido para reservas
     * Abre WhatsApp en una nueva pestaña con número y mensaje configurados
     */
    const redirectWhatsApp = () => {
        const phoneNumber = '+51925075598'; // Reemplaza con el número de teléfono
        const message = 'Hola, ¿puedo reservar tu espacio deportivo?'; // Reemplaza con el mensaje que quieras enviar
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener noreferrer');
    };

    // ==================== FUNCIONES DE MODALES ====================

    /**
     * Maneja la selección de fecha y transición al modal de horarios
     * @param {string} fecha - Fecha seleccionada por el usuario
     */
    const manejarSeleccionFecha = (fecha) => {
        setFechaSeleccionada(fecha);
        setCalendarsOpen(false);
        setListTimeOpen(true);
    };

    // Maneja la transición del modal de horarios al resumen de reserva
    const manejarMostrarResumen = () => {
        setListTimeOpen(false);
        setReservationSummaryOpen(true);
    };

    // Maneja el regreso del resumen de reserva al modal de horarios
    const manejarVolverAListTime = () => {
        setReservationSummaryOpen(false);
        setListTimeOpen(true);
    };

    // Maneja el regreso del modal de horarios al calendario
    const manejarVolverACalendario = () => {
        setListTimeOpen(false);
        setCalendarsOpen(true);
    };

    // Maneja la confirmación final de la reserva
    const manejarConfirmarReserva = () => {
        // Aquí se puede agregar lógica adicional después de confirmar
        console.log('Reserva procesada exitosamente');
        setReservationSummaryOpen(false);
    };

    // Maneja la transición del resumen de reserva a métodos de pago
    // Parámetro: dataReserva - Datos de la reserva para procesar el pago
    const manejarContinuarAPago = (dataReserva) => {
        setReservationData(dataReserva);
        setReservationSummaryOpen(false);
        setPaymentMethodsOpen(true);
    };

    // Maneja el regreso de métodos de pago al resumen de reserva
    const manejarVolverAResumen = () => {
        setPaymentMethodsOpen(false);
        setReservationSummaryOpen(true);
    };

    // ==================== OBJETO DE RETORNO ====================
    // Retorna todos los estados y funciones necesarios para manejar espacios deportivos
    return {
        // Estados de modales
        calendarsOpen,                    // Estado del modal de calendarios
        setCalendarsOpen,                // Setter para el modal de calendarios
        listTimeOpen,                    // Estado del modal de lista de horarios
        setListTimeOpen,                 // Setter para el modal de lista de horarios
        reservationSummaryOpen,          // Estado del modal de resumen de reserva
        setReservationSummaryOpen,       // Setter para el modal de resumen de reserva
        paymentMethodsOpen,              // Estado del modal de métodos de pago
        setPaymentMethodsOpen,           // Setter para el modal de métodos de pago
        
        // Estados de reserva
        fechaSeleccionada,               // Fecha seleccionada para la reserva
        setFechaSeleccionada,            // Setter para la fecha seleccionada
        reservationData,                 // Datos de la reserva para procesar el pago
        setReservationData,              // Setter para los datos de la reserva
        
        // Estados de galería
        imagenPrincipal,                 // URL de la imagen principal mostrada
        setImagenPrincipal,              // Setter para la imagen principal
        indiceDesplazamiento,            // Índice de desplazamiento para la galería
        
        // Funciones de navegación entre modales
        manejarSeleccionFecha,           // Maneja la selección de fecha y abre horarios
        manejarMostrarResumen,           // Transición de horarios a resumen
        manejarVolverAListTime,          // Regreso de resumen a horarios
        manejarVolverACalendario,        // Regreso de horarios a calendario
        manejarConfirmarReserva,         // Confirmación final de la reserva
        manejarContinuarAPago,           // Transición de resumen a métodos de pago
        manejarVolverAResumen,           // Regreso de métodos de pago a resumen
        
        // Funciones de galería
        manejarDesplazamientoIzquierda,  // Desplazamiento hacia la izquierda en galería
        manejarDesplazamientoDerecha,    // Desplazamiento hacia la derecha en galería
        
        // Funciones de integración externa
        redirectWhatsApp                 // Redirección a WhatsApp para consultas
    };
};