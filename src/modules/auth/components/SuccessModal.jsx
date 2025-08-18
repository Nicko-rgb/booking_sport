import React, { useEffect } from 'react'
import '../styles/SuccessModal.css'

const SuccessModal = ({ isOpen, onClose, message, type = 'success' }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 3000) // Cierra en 3 segundos
            return () => clearTimeout(timer)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className={`toast-modal ${type}`}>
            <span className="toast-icon">{type === 'success' ? '✓' : '✗'}</span>
            <span className="toast-message">{message}</span>
            <button className="toast-close" onClick={onClose}>×</button>
        </div>
    )
}

export default SuccessModal