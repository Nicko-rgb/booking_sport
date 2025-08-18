import React, { useState, useEffect } from 'react'
import "../styles/LoginRegister.css"
import { usersLogin } from "../data/usersLogin.js"
import SuccessModal from './SuccessModal'
import MobileLoginRegister from './MobileLoginRegister'

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
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
        if (isLogin) {
            // Validar credenciales con los datos de usersLogin.js
            const user = usersLogin.find(u => u.gmail === formData.email && u.password === formData.password)
            if (user) {
                setModal({
                    isOpen: true,
                    message: `¡Bienvenido de vuelta! Has iniciado sesión exitosamente.`,
                    type: 'success'
                })
                console.log('Usuario autenticado:', user)
                // Aquí puedes redirigir o manejar el estado de autenticación
            } else {
                setModal({
                    isOpen: true,
                    message: 'Credenciales incorrectas. Por favor verifica tu email y contraseña.',
                    type: 'error'
                })
            }
        } else {
            // Validar que las contraseñas coincidan
            if (formData.password !== formData.confirmPassword) {
                setModal({
                    isOpen: true,
                    message: 'Las contraseñas no coinciden. Por favor verifica.',
                    type: 'error'
                })
                return
            }

            // Simular registro de nuevo usuario
            const newUser = {
                id: usersLogin.length + 1,
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
            setIsLogin(true)
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

    const toggleMode = () => {
        setIsTransitioning(true)

        // Cambio inmediato sin pausa perceptible
        setTimeout(() => {
            setIsLogin(!isLogin)
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                numero: '',
                password: '',
                confirmPassword: ''
            })
            setIsTransitioning(false)
        }, 180)
    }

    // Efecto para detectar dispositivos móviles
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            setIsMobile(isMobileDevice)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Efecto para agregar clases de animación
    useEffect(() => {
        const formSection = document.querySelector('.form-section')
        const welcomeSection = document.querySelector('.welcome-section')

        if (formSection && welcomeSection && !isTransitioning) {
            formSection.classList.add('slide-in')
            welcomeSection.classList.add('slide-in')

            // Remover las clases después de la animación rápida
            const timer = setTimeout(() => {
                formSection.classList.remove('slide-in')
                welcomeSection.classList.remove('slide-in')
            }, 500)

            return () => clearTimeout(timer)
        }
    }, [isLogin, isTransitioning])

    const closeModal = () => {
        setModal({
            isOpen: false,
            message: '',
            type: 'success'
        })
    }

    // Si es móvil, mostrar el componente móvil
    if (isMobile) {
        return <MobileLoginRegister />
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                {isLogin ? (
                    // Login Form
                    <>
                        <div className={`form-section ${isTransitioning ? 'transitioning' : ''}`}>
                            <div className="form-header">
                                <h2>Accede a tu cuenta</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="input-container">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                                <div className="input-container password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Contraseña"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                                {/* metemos dentro de un div al boton */}
                                <div className="button-container">
                                    <button type="submit" className="auth-button">ENTRAR</button>

                                </div>
                            </form>
                        </div>

                        <div className={`welcome-section login-welcome ${isTransitioning ? 'transitioning' : ''}`}>
                            <h2>¿Eres nuevo por aquí?</h2>
                            <p>Crea una cuenta para acceder a todas nuestras funciones.</p>
                            <button onClick={toggleMode} className="toggle-button" disabled={isTransitioning}>CREAR CUENTA</button>
                        </div>
                    </>
                ) : (
                    // Register Form
                    <>
                        <div className={`welcome-section register-welcome ${isTransitioning ? 'transitioning' : ''}`}>
                            <h2>¡Qué bueno tenerte aquí!</h2>
                            <p>Completa tus datos para registrarte en el sistema.</p>
                            <button onClick={toggleMode} className="toggle-button" disabled={isTransitioning}>YA TENGO CUENTA</button>
                        </div>

                        <div className={`form-section ${isTransitioning ? 'transitioning' : ''}`}>
                            <div className="form-header">
                                <h2>Crea tu cuenta</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="input-container">
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
                                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                                </div>
                                <div className="input-container">
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
                                    {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                                </div>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                                <div className="input-container">
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
                                    {errors.numero && <span className="error-message">{errors.numero}</span>}
                                </div>
                                <div className="input-container password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Contraseña"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                <div className="input-container password-container">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirmar Contraseña"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                <div className="button-container">
                                    <button type="submit" className="auth-button">REGÍSTRESE</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}

                <SuccessModal
                    isOpen={modal.isOpen}
                    onClose={closeModal}
                    message={modal.message}
                    type={modal.type}
                />

            </div>


        </div>
    )
}

export default LoginRegister;