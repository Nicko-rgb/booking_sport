// Auth Store - Manages authentication state and actions
import { axiosInstance } from "../../../shared/utils/axiosInstance";
import { toast } from 'react-toastify';

export const createAuthSlice = (set, get, api) => ({

    // Estados
    isAuthenticated: false,
    user: null,
    token: null,
    
    // Funcion de inicio de sesion para usuario
    loginUser: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            if (response.status === 200) {
                toast.success('Inicio de sesion exitoso');
                get().navigate('/');
                set({ isAuthenticated: true, user: response.data.user, token: response.data.token });
                localStorage.setItem('token', response.data.token);
                get().setUser(response.data.user);
                get().setToken(response.data.token);
            } else {
                toast.error('Error en el inicio de sesion');
            }
        } catch (error) {
            toast.error('Error en el inicio de sesion');
        }
    },

    // Funcion de registro para usuario
    registerUser: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/register', data);
            if (response.status === 200) {
                toast.success('Registro exitoso');
            } else {
                toast.error('Error en el registro');
            }
        } catch (error) {
            toast.error('Error en el registro');
        }
    },

    // Funcion de cierre de sesion
    logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
        localStorage.removeItem('token');
        get().navigate('/login');
    },

});