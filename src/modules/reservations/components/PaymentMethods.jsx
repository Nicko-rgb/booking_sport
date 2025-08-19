import React, { useState } from 'react';
import { useReservationContext } from '../context/ReservationContext';
import '../styles/paymentMethods.css';
import { IoIosArrowBack } from "react-icons/io";
import { FaCreditCard, FaPaypal, FaUniversity, FaMobileAlt } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";

const PaymentMethods = ({ open, onClose, onBackToSummary, reservationData }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        email: '',
        phone: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        horariosSeleccionados,
        calcularPrecioTotal,
        limpiarSelecciones
    } = useReservationContext();

    if (!open) return null;

    const precioTotal = calcularPrecioTotal();

    const paymentMethods = [
        {
            id: 'credit-card',
            name: 'Tarjeta de Crédito/Débito',
            icon: <FaCreditCard />,
            description: 'Visa, Mastercard, American Express'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: <FaPaypal />,
            description: 'Pago seguro con PayPal'
        },
        {
            id: 'bank-transfer',
            name: 'Transferencia Bancaria',
            icon: <FaUniversity />,
            description: 'Transferencia directa desde tu banco'
        },
        {
            id: 'mobile-payment',
            name: 'Pago Móvil',
            icon: <FaMobileAlt />,
            description: 'Yape, Plin, BIM'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Simular proceso de pago
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Aquí se integraría con el gateway de pago real
            console.log('Procesando pago:', {
                method: selectedPaymentMethod,
                amount: precioTotal,
                details: paymentDetails,
                reservation: horariosSeleccionados
            });

            // Limpiar selecciones después del pago exitoso
            limpiarSelecciones();

            // Mostrar mensaje de éxito
            alert('¡Pago procesado exitosamente! Tu reserva ha sido confirmada.');

            // Cerrar modal
            onClose();
        } catch (error) {
            console.error('Error en el pago:', error);
            alert('Error al procesar el pago. Por favor, intenta nuevamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    const renderPaymentForm = () => {
        switch (selectedPaymentMethod) {
            case 'credit-card':
                return (
                    <div className="payment-form">
                        <div className="form-group">
                            <label>Número de Tarjeta</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                            />
                            <div className="card-icons">
                                <SiVisa />
                                <SiMastercard />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Fecha de Vencimiento</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={paymentDetails.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/AA"
                                    maxLength="5"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={paymentDetails.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    maxLength="4"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Nombre en la Tarjeta</label>
                            <input
                                type="text"
                                name="cardName"
                                value={paymentDetails.cardName}
                                onChange={handleInputChange}
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>
                    </div>
                );
            case 'paypal':
                return (
                    <div className="payment-form">
                        <div className="form-group">
                            <label>Email de PayPal</label>
                            <input
                                type="email"
                                name="email"
                                value={paymentDetails.email}
                                onChange={handleInputChange}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                        <p className="payment-note">
                            Serás redirigido a PayPal para completar el pago de forma segura.
                        </p>
                    </div>
                );
            case 'bank-transfer':
                return (
                    <div className="payment-form">
                        <div className="bank-info">
                            <h4>Datos para Transferencia</h4>
                            <p><strong>Banco:</strong> BCP</p>
                            <p><strong>Cuenta:</strong> 123-456789-0-12</p>
                            <p><strong>CCI:</strong> 00212312345678901234</p>
                            <p><strong>Titular:</strong> Recreo y Deporte Amazonas</p>
                        </div>
                        <div className="form-group">
                            <label>Número de Operación</label>
                            <input
                                type="text"
                                name="operationNumber"
                                placeholder="Ingresa el número de operación"
                                required
                            />
                        </div>
                    </div>
                );
            case 'mobile-payment':
                return (
                    <div className="payment-form">
                        <div className="form-group">
                            <label>Número de Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                value={paymentDetails.phone}
                                onChange={handleInputChange}
                                placeholder="987 654 321"
                                required
                            />
                        </div>
                        <div className="mobile-options">
                            <button type="button" className="mobile-option">
                                <img src="/yape-logo.png" alt="Yape" />
                                Yape
                            </button>
                            <button type="button" className="mobile-option">
                                <img src="/plin-logo.png" alt="Plin" />
                                Plin
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="payment-methods modal" onClick={onClose}>
            <div className="payment-content" onClick={(e) => e.stopPropagation()}>
                <div className="payment-header">
                    <h2>Métodos de Pago</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="payment-body">
                    <div className="payment-summary">
                        <h3>Resumen del Pago</h3>
                        <div className="summary-item">
                            <span>Total a Pagar:</span>
                            <span className="total-amount">S/ {precioTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="payment-methods-list">
                        <h3>Selecciona un Método de Pago</h3>
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`payment-method-item ${
                                    selectedPaymentMethod === method.id ? 'selected' : ''
                                }`}
                                onClick={() => setSelectedPaymentMethod(method.id)}
                            >
                                <div className="method-icon">{method.icon}</div>
                                <div className="method-info">
                                    <h4>{method.name}</h4>
                                    <p>{method.description}</p>
                                </div>
                                <div className="method-radio">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={selectedPaymentMethod === method.id}
                                        onChange={() => setSelectedPaymentMethod(method.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedPaymentMethod && (
                        <form onSubmit={handlePaymentSubmit} className="payment-details">
                            <h3>Detalles del Pago</h3>
                            {renderPaymentForm()}
                        </form>
                    )}
                </div>

                <div className="payment-footer">
                    <button
                        className="btn-volver"
                        onClick={onBackToSummary}
                        disabled={isProcessing}
                    >
                        <IoIosArrowBack fontSize={18} /> VOLVER
                    </button>

                    <button
                        className="btn-cancelar"
                        onClick={onClose}
                        disabled={isProcessing}
                    >
                        CANCELAR
                    </button>

                    <button
                        className="btn-pagar"
                        onClick={handlePaymentSubmit}
                        disabled={!selectedPaymentMethod || isProcessing}
                    >
                        {isProcessing ? 'Procesando...' : `Pagar S/ ${precioTotal.toFixed(2)}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethods;