import React, { useState } from 'react'
import styles from "../../styles/LoginRegister.module.css"
import { users } from "../../data/users.js"
import SuccessModal from './SuccessModal'

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        numero: '',
        password: ''
    })
    const [modal, setModal] = useState({
        isOpen: false,
        message: '', 
        type: 'success'
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            // Validar credenciales con los datos de users.js
            const user = users.find(u => u.gmail === formData.email && u.password === formData.password)
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
            // Simular registro de nuevo usuario
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
            setIsLogin(true)
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                numero: '',
                password: ''
            })
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            numero: '',
            password: ''
        })
    }

    const closeModal = () => {
        setModal({
            isOpen: false,
            message: '',
            type: 'success'
        })
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                {isLogin ? (
                    // Login Form
                    <>
                        <div className={styles.formSection}>
                            <div className={styles.formHeader}>
                                <h2>Inicia Sesión</h2>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.authForm}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <a href="#" className={styles.forgotPassword}>Forgot Your Password?</a>
                                {/* metemos dentro de un div al boton */}
                                <div className={styles.buttonContainer}>
                                    <button type="submit" className={styles.authButton}>INICIAR SESIÓN</button>
                                </div>
                            </form>
                        </div>

                        <div className={`${styles.welcomeSection} ${styles.loginWelcome}`}>
                            <h2>Hola, Bienvenido!</h2>
                            <p>Regístrese con sus datos personales para utilizar todas las funciones del sitio.</p>
                            <button onClick={toggleMode} className={styles.toggleButton}>REGÍSTRESE</button>
                        </div>
                    </>
                ) : (
                    // Register Form
                    <>
                        <div className={`${styles.welcomeSection} ${styles.registerWelcome}`}>
                            <h2>Bienvenidos nuevamente!</h2>
                            <p>Ingrese sus datos personales para utilizar todas las funciones del sitio.</p>
                            <button onClick={toggleMode} className={styles.toggleButton}>INICIA SESIÓN</button>
                        </div>

                        <div className={styles.formSection}>
                            <div className={styles.formHeader}>
                                <h2>Crear una cuenta</h2>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.authForm}>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Gmail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="numero"
                                    placeholder="Número"
                                    value={formData.numero}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className={styles.buttonContainer}>
                                    <button type="submit" className={styles.authButton}>REGÍSTRESE</button>
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

export default LoginRegister