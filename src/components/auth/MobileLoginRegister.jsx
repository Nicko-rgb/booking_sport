import React, { useState } from 'react'
import "../../styles/LoginRegister/MobileLoginRegister.css"
import { users } from "../../data/users.js"
import SuccessModal from './SuccessModal'

const MobileLoginRegister = () => {
    const [currentView, setCurrentView] = useState('login') // 'login', 'register'
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        numero: '',
        password: '',
        confirmPassword: ''
    })
    const [modal, setModal] = useState({
        isOpen: false,
        message: '',
        type: 'success'
    })
    const [errors, setErrors] = useState({})

    const validateField = (name, value) => {
        const newErrors = { ...errors }
        
        switch (name) {
            case 'nombre':
            case 'apellido':
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) && value !== '') {
                    newErrors[name] = 'Solo se permiten letras'
                } else {
                    delete newErrors[name]
                }
                break
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== '') {
                    newErrors[name] = 'Formato de email inválido'
                } else {
                    delete newErrors[name]
                }
                break
            case 'numero':
                if (!/^[0-9]*$/.test(value)) {
                    newErrors[name] = 'Solo se permiten números'
                } else if (value.length > 9) {
                    newErrors[name] = 'Máximo 9 dígitos'
                } else {
                    delete newErrors[name]
                }
                break
            default:
                delete newErrors[name]
        }
        
        setErrors(newErrors)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        
        // Para el campo de número, limitar a 9 dígitos y solo números
        if (name === 'numero') {
            const numericValue = value.replace(/[^0-9]/g, '').slice(0, 9)
            setFormData({
                ...formData,
                [name]: numericValue
            })
            validateField(name, numericValue)
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
            validateField(name, value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentView === 'login') {
            // Validar credenciales
            const user = users.find(u => u.gmail === formData.email && u.password === formData.password)
            if (user) {
                setModal({
                    isOpen: true,
                    message: `¡Bienvenido de vuelta! Has iniciado sesión exitosamente.`,
                    type: 'success'
                })
                console.log('Usuario autenticado:', user)
            } else {
                setModal({
                    isOpen: true,
                    message: 'Credenciales incorrectas. Por favor verifica tu email y contraseña.',
                    type: 'error'
                })
            }
        } else if (currentView === 'register') {
            // Validar que las contraseñas coincidan
            if (formData.password !== formData.confirmPassword) {
                setModal({
                    isOpen: true,
                    message: 'Las contraseñas no coinciden. Por favor verifica.',
                    type: 'error'
                })
                return
            }

            // Simular registro
            const newUser = {
                id: users.length + 1,
                gmail: formData.email,
                password: formData.password,
                nombre: formData.nombre,
                apellido: formData.apellido,
                numero: formData.numero
            }
            console.log('Nuevo usuario registrado:', newUser)
            setModal({
                isOpen: true,
                message: '¡Registro exitoso! Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
                type: 'success'
            })
            setCurrentView('login')
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                numero: '',
                password: '',
                confirmPassword: ''
            })
        }
    }

    const resetForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            numero: '',
            password: '',
            confirmPassword: ''
        })
    }

    const closeModal = () => {
        setModal({
            isOpen: false,
            message: '',
            type: 'success'
        })
    }

    const renderLoginScreen = () => (
        <div className="mobile-auth-screen login-screen">
            <div className="auth-header">
                <h2>Hola,<br />¡Inicia Sesión!</h2>
            </div>

            <form onSubmit={handleSubmit} className="mobile-auth-form">
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <span className="input-icon email-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </span>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="input-group password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <span className="input-icon lock-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </span>
                    <button
                        type="button"
                        className="password-toggle-mobile"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                <button type="submit" className="submit-btn">
                    Iniciar Sesión
                </button>

                <a href="#" className="forgot-password">¿Olvidaste tu Contraseña?</a>
            </form>

            <div className="switch-mode">
                <p>¿No tienes cuenta?
                    <button
                        type="button"
                        onClick={() => {
                            setCurrentView('register')
                            resetForm()
                        }}
                    >
                        Regístrate
                    </button>
                </p>
            </div>
        </div>
    )

    const renderRegisterScreen = () => (
        <div className="mobile-auth-screen register-screen">
            <div className="auth-header">
                <h2>Crea Tu Cuenta</h2>
            </div>

            <form onSubmit={handleSubmit} className="mobile-auth-form">
                <div className="input-group">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombres"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                        title="Solo se permiten letras"
                        required
                    />
                    <span className="input-icon user-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellidos"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                        title="Solo se permiten letras"
                        required
                    />
                    <span className="input-icon user-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                    {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <span className="input-icon email-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </span>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="input-group">
                    <input
                        type="tel"
                        name="numero"
                        placeholder="Celular (9 dígitos)"
                        value={formData.numero}
                        onChange={handleInputChange}
                        pattern="[0-9]{9}"
                        title="El número de teléfono debe tener exactamente 9 dígitos"
                        maxLength="9"
                        required
                    />
                    <span className="input-icon phone-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                    </span>
                    {errors.numero && <span className="error-message">{errors.numero}</span>}
                </div>

                <div className="input-group password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <span className="input-icon lock-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </span>
                    <button
                        type="button"
                        className="password-toggle-mobile"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                <div className="input-group password-group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <span className="input-icon lock-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </span>
                    <button
                        type="button"
                        className="password-toggle-mobile"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                <button type="submit" className="submit-btn">
                    Registrarse
                </button>
            </form>

            <div className="switch-mode">
                <p>¿Ya tienes una cuenta?
                    <button
                        type="button"
                        onClick={() => {
                            setCurrentView('login')
                            resetForm()
                        }}
                    >
                        Inicia Sesión
                    </button>
                </p>
            </div>
        </div>
    )

    return (
        <div className="mobile-auth-container">
            {currentView === 'login' && renderLoginScreen()}
            {currentView === 'register' && renderRegisterScreen()}

            <SuccessModal
                isOpen={modal.isOpen}
                onClose={closeModal}
                message={modal.message}
                type={modal.type}
            />
        </div>
    )
}

export default MobileLoginRegister;