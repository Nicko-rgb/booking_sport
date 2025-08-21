import React from 'react'
import '../../styles/Modal.css'

const Modal = ({ isOpen, onClose, title, children, size = 'medium', headerColor = 'default' }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '0px'
        } else {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            // Forzar el reflow del documento
            document.body.offsetHeight
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            {/* Conteido de modal */}
            <div className={`modal-container modal-${size}`}>
                {/* Header del modal */}
                <header className={`modal-header ${headerColor !== 'default' ? `modal-header-${headerColor}` : ''}`} style={headerColor !== 'default' && !headerColor.startsWith('#') ? {} : headerColor.startsWith('#') ? { background: `linear-gradient(135deg, ${headerColor} 0%, ${headerColor}dd 100%)` } : {}}>
                    <h2 className="modal-title">{title}</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </header>
                {/* Cuerpo del modal  .modal-body-example*/}
                {children}
            </div>
        </div>
    )
}

export default Modal