import { useState, useEffect } from 'react';

export const useStoreSpaceSport = (currentGallery = []) => {
    const [calendarsOpen, setCalendarsOpen] = useState(false);
    const [listTimeOpen, setListTimeOpen] = useState(false);
    const [reservationSummaryOpen, setReservationSummaryOpen] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [indiceDesplazamiento, setIndiceDesplazamiento] = useState(0);

    // Actualizar imagen principal cuando cambie la galería
    useEffect(() => {
        if (currentGallery.length > 0 && !currentGallery.includes(imagenPrincipal)) {
            setImagenPrincipal(currentGallery[0]);
        }
    }, [currentGallery, imagenPrincipal]);

    useEffect(() => {
        if (currentGallery.length === 0) return;
        
        const intervalo = setInterval(() => {
            const indiceActual = currentGallery.findIndex(img => img === imagenPrincipal);
            const siguienteIndice = (indiceActual + 1) % currentGallery.length;
            setImagenPrincipal(currentGallery[siguienteIndice]);
        }, 3000);

        return () => clearInterval(intervalo);
    }, [imagenPrincipal, currentGallery]);

    // Nota: renderStars se movió al componente SpaceSport.jsx ya que los hooks no pueden retornar JSX

    // Funcion para manejar el desplazamiento de las imagenes a la izquierda
    const manejarDesplazamientoIzquierda = () => {
        const nuevoIndice = Math.max(0, indiceDesplazamiento - 3);
        setIndiceDesplazamiento(nuevoIndice);
    };

    // Funcion para manejar el desplazamiento de las imagenes a la derecha
    const manejarDesplazamientoDerecha = () => {
        const maxIndice = Math.max(0, currentGallery.length - 3);
        const nuevoIndice = Math.min(maxIndice, indiceDesplazamiento + 3);
        setIndiceDesplazamiento(nuevoIndice);
    };

    // Funcion para redirigir a whatsapp
    const redirectWhatsApp = () => {
        const phoneNumber = '+51925075598'; // Reemplaza con el número de teléfono
        const message = 'Hola, ¿puedo reservar tu espacio deportivo?'; // Reemplaza con el mensaje que quieras enviar
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener noreferrer');
    };

    // Funciones para manejar la navegación entre modales
    const manejarSeleccionFecha = (fecha) => {
        setFechaSeleccionada(fecha);
        setCalendarsOpen(false);
        setListTimeOpen(true);
    };

    const manejarMostrarResumen = () => {
        setListTimeOpen(false);
        setReservationSummaryOpen(true);
    };

    const manejarVolverAListTime = () => {
        setReservationSummaryOpen(false);
        setListTimeOpen(true);
    };

    const manejarVolverACalendario = () => {
        setListTimeOpen(false);
        setCalendarsOpen(true);
    };

    const manejarConfirmarReserva = () => {
        // Aquí se puede agregar lógica adicional después de confirmar
        console.log('Reserva procesada exitosamente');
        setReservationSummaryOpen(false);
    };

    return {
        // Estados
        calendarsOpen,
        setCalendarsOpen,
        listTimeOpen,
        setListTimeOpen,
        reservationSummaryOpen,
        setReservationSummaryOpen,
        fechaSeleccionada,
        setFechaSeleccionada,
        imagenPrincipal,
        setImagenPrincipal,
        indiceDesplazamiento,
        
        // Funciones
        manejarSeleccionFecha,
        manejarMostrarResumen,
        manejarVolverAListTime,
        manejarVolverACalendario,
        manejarConfirmarReserva,
        manejarDesplazamientoIzquierda,
        manejarDesplazamientoDerecha,
        redirectWhatsApp,
        // renderStars se movió al componente
    };
};