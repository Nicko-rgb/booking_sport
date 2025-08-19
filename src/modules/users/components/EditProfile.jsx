import React, { useState } from 'react'
import '../styles/EditProfile.css'
import userData from '../data/userProfile.js'

const EditProfile = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        birthDate: userData.birthDate,
        address: userData.address,
        favoritesSports: userData.favoritesSports ? userData.favoritesSports.split(', ') : []
    })

    // Lista de deportes disponibles en la ciudad
    const availableSports = [
        'Fútbol',
        'Básquet',
        'Tenis',
        'Vóleibol',
        'Natación',
        'Atletismo',
        'Ciclismo',
        'Ping Pong',
        'Bádminton',
        'Squash',
        'Boxeo',
        'Karate',
        'Yoga',
        'Pilates',
        'CrossFit'
    ]

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSportChange = (sport) => {
        setFormData(prev => {
            const currentSports = prev.favoritesSports
            const isSelected = currentSports.includes(sport)

            if (isSelected) {
                // Remover deporte si ya está seleccionado
                return {
                    ...prev,
                    favoritesSports: currentSports.filter(s => s !== sport)
                }
            } else {
                // Agregar deporte si no está seleccionado
                return {
                    ...prev,
                    favoritesSports: [...currentSports, sport]
                }
            }
        })
    }

    const validateForm = () => {
        const newErrors = {}

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres'
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Ingresa un correo electrónico válido'
        }

        // Validar teléfono
        if (!formData.phone.trim()) {
            newErrors.phone = 'El número de teléfono es requerido'
        } else if (formData.phone.trim().length < 10) {
            newErrors.phone = 'Ingresa un número de teléfono válido'
        }

        // Validar dirección
        if (!formData.address.trim()) {
            newErrors.address = 'La dirección es requerida'
        }

        // Validar fecha de nacimiento
        if (!formData.birthDate.trim()) {
            newErrors.birthDate = 'La fecha de nacimiento es requerida'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Convertir array de deportes a string para guardar
            const dataToSave = {
                ...formData,
                favoritesSports: formData.favoritesSports.join(', ')
            }

            console.log('Datos guardados:', dataToSave)

            if (onSave) {
                onSave(dataToSave)
            }
        } catch (error) {
            console.error('Error al guardar:', error)
            alert('Error al guardar los datos. Inténtalo de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            birthDate: userData.birthDate,
            address: userData.address,
            favoritesSports: userData.favoritesSports ? userData.favoritesSports.split(', ') : []
        })
        setErrors({})
        if (onCancel) {
            onCancel()
        }
    }

    return (
        <div className="edit-profile-modal-content">
            <div className="edit-profile-description">
                <p>Modifica tu información personal y guarda los cambios</p>
            </div>

            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Nombre y Apellido *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={errors.name ? 'error' : ''}
                            placeholder="Ingresa tu nombre completo"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="ejemplo@correo.com"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Número de Celular *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={errors.phone ? 'error' : ''}
                            placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDate">Fecha de Nacimiento *</label>
                        <input
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className={errors.birthDate ? 'error' : ''}
                            placeholder="15 de Marzo, 1990"
                        />
                        {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="address">Dirección *</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={errors.address ? 'error' : ''}
                            placeholder="Calle Principal 123, Ciudad, País"
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label>Deportes Favoritos</label>
                        <div className="sports-selection">
                            <p className="sports-description">Selecciona los deportes que más te gustan (disponibles en tu ciudad):</p>
                            <div className="sports-grid">
                                {availableSports.map(sport => (
                                    <div key={sport} className="sport-option">
                                        <input
                                            type="checkbox"
                                            id={`sport-${sport}`}
                                            checked={formData.favoritesSports.includes(sport)}
                                            onChange={() => handleSportChange(sport)}
                                        />
                                        <label htmlFor={`sport-${sport}`} className="sport-label">
                                            {sport}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {formData.favoritesSports.length > 0 && (
                                <div className="selected-sports">
                                    <span className="selected-label">Seleccionados: </span>
                                    <span className="selected-list">{formData.favoritesSports.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-save"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile