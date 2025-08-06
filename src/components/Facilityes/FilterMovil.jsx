import React from 'react';
import '../../styles/Facilityes/filterMovil.css';
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const FilterMovil = ({ 
    viewFilter, 
    setViewFilter, 
    filters, 
    setFilters, 
    handleFilterChange, 
    cities, 
    sports 
}) => {
    if (!viewFilter) return null;

    return (
        <div className="filter-movil">
            <div className="filter-movil__overlay" onClick={() => setViewFilter(false)}>
                <div className="filter-movil__content" onClick={(e) => e.stopPropagation()}>
                    <div className="filter-movil__header">
                        <h3>Filtrar establecimientos</h3>
                        <button 
                            className="filter-movil__close-btn"
                            onClick={() => setViewFilter(false)}
                            aria-label="Cerrar filtros"
                        >
                            <IoClose />
                        </button>
                    </div>
                    
                    <div className="filter-movil__body">
                        {/* Filtro por Ciudad */}
                        <div className="filter-movil__group">
                            <label htmlFor="modal-city-filter">Ciudad:
                                <select
                                    id="modal-city-filter"
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                >
                                    <option value="">Todas las ciudades</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        
                        {/* Filtro por Deporte */}
                        <div className="filter-movil__group">
                            <label htmlFor="modal-sport-filter">Deporte:
                                <select
                                    id="modal-sport-filter"
                                    value={filters.sport}
                                    onChange={(e) => handleFilterChange('sport', e.target.value)}
                                >
                                    <option value="">Todos los deportes</option>
                                    {sports.map(sport => (
                                        <option key={sport} value={sport}>{sport}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {/* Filtro por Disponibilidad */}
                        <div className="filter-movil__group">
                            <label htmlFor="modal-availability-filter">Disponibilidad:
                                <select
                                    id="modal-availability-filter"
                                    value={filters.availability}
                                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="available">Solo disponibles</option>
                                    <option value="premium">Solo premium</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                    <div className="filter-movil__footer">
                        <button 
                            className="filter-movil__clear-btn"
                            onClick={() => {
                                setFilters({
                                    city: '',
                                    sport: '',
                                    rating: '',
                                    priceRange: '',
                                    availability: 'all'
                                });
                            }}
                        >
                            <RiDeleteBin6Line />
                            Limpiar filtros
                        </button>
                        <button 
                            className="filter-movil__apply-btn"
                            onClick={() => setViewFilter(false)}
                        >
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterMovil