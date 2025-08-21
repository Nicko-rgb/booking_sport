import React, { useState } from 'react';
import { MdOutlinePhoneEnabled, MdKeyboardArrowDown, MdOutlineLocalPhone } from 'react-icons/md';
import '../styles/selectPhone.css'

const countryCodes = [
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'México' },
    { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brasil' },
    { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile' },
    { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' },
    { code: '+58', country: 'VE', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+51', country: 'PE', flag: '', name: 'Perú' },
    { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+502', country: 'GT', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+53', country: 'CU', flag: '🇨🇺', name: 'Cuba' }
];


const SelectPhone = ({ value = '', onChange, disabled = false, placeholder = '' }) => {
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(value);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        // Notificar el cambio completo del teléfono
        if (onChange) {
            onChange(`${country.code}${phoneNumber}`);
        }
    };

    const handlePhoneChange = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        // Notificar el cambio completo del teléfono
        if (onChange) {
            onChange(`${selectedCountry.code}${newPhoneNumber}`);
        }
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    return (
        <aside className='select-phone'>
            {/* Selector de código de país */}
            <div className={`select-country ${isDropdownOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
                <button type="button" onClick={toggleDropdown}>
                    {selectedCountry.country + ' ' + selectedCountry.code}
                    <MdKeyboardArrowDown className={`arrow ${isDropdownOpen ? 'rotated' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className='country-dropdown'>
                        <input
                            type="text"
                            placeholder="Buscar país"
                            className='search-country'
                        />
                        {countryCodes.map((country, index) => (
                            <div
                                key={`${country.country}-${index}`}
                                className={`country-option ${selectedCountry.country === country.country && selectedCountry.code === country.code ? 'selected' : ''}`}
                                onClick={() => handleCountrySelect(country)}
                            >
                                {country.country} {country.code}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input del número de teléfono */}
            <div className="input-group">
                <input
                    type="tel"
                    name='phone'
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={placeholder || ''}
                    disabled={disabled}
                    className='phone-input'
                />
                <label>Teléfono</label>
                <MdOutlineLocalPhone className="icon-tel" />
            </div>
            {/* Overlay para cerrar dropdown al hacer clic fuera */}
            {isDropdownOpen && (
                <div
                    className='dropdown-overlay'
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </aside>
    )
}

export default SelectPhone