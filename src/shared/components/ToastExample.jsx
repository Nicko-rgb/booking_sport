import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/Toast.css';

const ToastExample = () => {
    const showSuccess = () => {
        toast.success('¡Operación completada exitosamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showError = () => {
        toast.error('¡Algo salió mal! Por favor intenta de nuevo.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showWarning = () => {
        toast.warning('¡Atención! Revisa los datos ingresados.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showInfo = () => {
        toast.info('Información importante para el usuario.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showLoading = () => {
        const toastId = toast.loading('Procesando solicitud...');
        
        // Simular proceso asíncrono
        setTimeout(() => {
            toast.update(toastId, {
                render: '¡Proceso completado!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
        }, 3000);
    };

    const showCustom = () => {
        toast('🎉 ¡Toast personalizado con emoji!', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'toast-pulse',
        });
    };

    const showMultiple = () => {
        toast.success('Primer mensaje');
        setTimeout(() => toast.info('Segundo mensaje'), 500);
        setTimeout(() => toast.warning('Tercer mensaje'), 1000);
        setTimeout(() => toast.error('Cuarto mensaje'), 1500);
    };

    const clearAll = () => {
        toast.dismiss();
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1f2937' }}>
                🍞 Sistema de Toast con React-Toastify
            </h1>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginBottom: '40px'
            }}>
                <button 
                    onClick={showSuccess}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                >
                    ✅ Toast Éxito
                </button>

                <button 
                    onClick={showError}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                    ❌ Toast Error
                </button>

                <button 
                    onClick={showWarning}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
                >
                    ⚠️ Toast Advertencia
                </button>

                <button 
                    onClick={showInfo}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                    ℹ️ Toast Info
                </button>

                <button 
                    onClick={showLoading}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                >
                    ⏳ Toast Loading
                </button>

                <button 
                    onClick={showCustom}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
                >
                    🎨 Toast Personalizado
                </button>

                <button 
                    onClick={showMultiple}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#ec4899',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#db2777'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ec4899'}
                >
                    🔢 Múltiples Toasts
                </button>

                <button 
                    onClick={clearAll}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#374151',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
                >
                    🗑️ Limpiar Todos
                </button>
            </div>

            <div style={{
                backgroundColor: '#f9fafb',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
            }}>
                <h3 style={{ marginTop: 0, color: '#374151' }}>📚 Características del Sistema:</h3>
                <ul style={{ color: '#6b7280', lineHeight: '1.6' }}>
                    <li>✨ <strong>Estilos personalizados</strong> con glassmorphism y gradientes</li>
                    <li>🎯 <strong>Posicionamiento flexible</strong> (top-right, top-left, center, etc.)</li>
                    <li>🎨 <strong>Tipos diferenciados</strong> con colores y iconos únicos</li>
                    <li>📱 <strong>Responsive design</strong> optimizado para móviles</li>
                    <li>🌙 <strong>Modo oscuro</strong> automático</li>
                    <li>⚡ <strong>Animaciones suaves</strong> y transiciones fluidas</li>
                    <li>🔄 <strong>Loading toasts</strong> con actualización dinámica</li>
                    <li>👆 <strong>Interactivo</strong> - hover, click, drag y dismiss</li>
                </ul>
            </div>

            <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
            }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#1e40af' }}>💡 Uso en tu aplicación:</h4>
                <code style={{
                    display: 'block',
                    backgroundColor: '#1f2937',
                    color: '#f9fafb',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                }}>
                    {`import { toast } from 'react-toastify';
import '../shared/styles/Toast.css';

// Usar en cualquier componente
toast.success('¡Mensaje exitoso!');`}
                </code>
            </div>

            {/* Contenedor de Toasts */}
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
        </div>
    );
};

export default ToastExample;