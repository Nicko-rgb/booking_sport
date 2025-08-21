import { useState } from 'react';
import { toast } from 'react-toastify';
import { createAuthSlice } from '../store/authStore';

/**
 * Hook personalizado para manejar la lógica del formulario de Login/Registro
 * Incluye estados y funciones para alternar entre modos, mostrar/ocultar contraseña y manejar envíos
 */
export const useLoginRegister = () => {
    // Estados locales
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Función para alternar entre Login y Register
    const handleToggleMode = () => {
        setIsLogin(!isLogin);
        setShowPassword(false); // Reset password visibility al cambiar de modo
    };

    // Función para manejar vista de contraseña
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Función para manejar envío de formularios (versión básica)
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.loading('Enviando formulario...', { position: 'top-center' });
        setTimeout(() => {
            toast.dismiss();
        }, 2000);
        setTimeout(() => {
            toast.success('Formulario enviado con éxito!', { position: 'top-center' });
        }, 2000);
    }

    // Función para resetear estados
    const resetStates = () => {
        setIsLogin(true);
        setShowPassword(false);
        setIsLoading(false);
    };

    return {
        // Estados
        isLogin,
        showPassword,
        isLoading,
        
        // Funciones
        handleToggleMode,
        handleShowPassword,
        handleSubmit,
        resetStates,
        
        // Setters (por si necesitas control directo)
        setIsLogin,
        setShowPassword,
        setIsLoading
    };
};

export default useLoginRegister;