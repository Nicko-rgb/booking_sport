import React, { useState } from 'react'
import { HiOutlineMail } from "react-icons/hi"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdOutlineLocalPhone } from "react-icons/md";
import '../styles/ResetPassword.css';
import SelectPhone from './SelectPhone';

const ResetPassword = ({ onClose }) => {
    const [resetMethod, setResetMethod] = useState('email') // 'email' or 'phone'
    const [formData, setFormData] = useState({
        email: '',
        phone: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleMethodChange = (method) => {
        setResetMethod(method)
        setFormData({ email: '', phone: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Simular proceso de envío
        setTimeout(() => {
            setIsLoading(false)
            onClose()
        }, 2000)
    }

    return (
        <div className="reset-password-container">
            <div className="reset-password-header">
                <h3>Restablecer Contraseña</h3>
                <p>Selecciona cómo quieres recibir el enlace de restablecimiento</p>
            </div>
            
            <section className="reset-method-selector">
                <button 
                    type="button"
                    className={`method-btn ${resetMethod === 'email' ? 'active' : ''}`}
                    onClick={() => handleMethodChange('email')}
                    disabled={isLoading}
                >
                    <HiOutlineMail />
                    Por Email
                </button>
                <button 
                    type="button"
                    className={`method-btn ${resetMethod === 'phone' ? 'active' : ''}`}
                    onClick={() => handleMethodChange('phone')}
                    disabled={isLoading}
                >
                    <MdOutlineLocalPhone />
                    Por Teléfono
                </button>
            </section>
            
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="input-slider-container">
                    <div className={`input-slider ${resetMethod === 'phone' ? 'slide-to-phone' : 'slide-to-email'}`}>
                        <div className="input-slide email-slide">
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="input-email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="" 
                                    disabled={isLoading}
                                />
                                <label htmlFor="reset-email">Email</label>
                                <HiOutlineMail className="input-icon" />
                            </div>
                        </div>
                        <div className="input-slide phone-slide">
                            <SelectPhone disabled={isLoading} />

                        </div>
                    </div>
                </div>
                
                <section className="reset-password-actions">
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <AiOutlineLoading3Quarters className="loading-icon" />
                                Enviando...
                            </>
                        ) : (
                            'Enviar Enlace'
                        )}
                    </button>
                </section>
            </form>
            
            <div className="reset-password-info">
                <p><strong>Nota:</strong> El enlace de restablecimiento será válido por 24 horas.</p>
            </div>
        </div>
    )
}

export default ResetPassword