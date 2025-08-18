import React, { useState } from 'react';
import '../modules/facilities/styles/facilityes.css';
import Header from '../shared/components/ui/Header';
import Footer from '../shared/components/ui/Footer';
import Card from '../modules/facilities/components/Card';
import FilterMovil from '../modules/facilities/components/FilterMovil';
import { facilitiesApi } from '../modules/facilities/data/facilityesApi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { BiSort, BiSortAlt2 } from "react-icons/bi";
import { MdLocationOn, MdStar, MdAttachMoney } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

const Facilityes = () => {
    // Estados de cada filtro

    const [facilities, setFacilities] = useState(facilitiesApi);
    const [viewFilter, setViewFilter] = useState(false);
    const [filters, setFilters] = useState({
        city: '',
        sport: '',
        rating: '',
        priceRange: '',
        availability: 'all'
    });

    // Obtener valores únicos para los filtros
    const cities = [...new Set(facilities.map(facility => facility.location.split(',')[1]?.trim()))];
    const sports = [...new Set(facilities.flatMap(facility => facility.availableSports))];

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    return (
        <div className='facilityes'>
            <Header />
            {/* Sección de filtros */}
            <section className="filters-section">
                <h2>Encuentra tu establecimiento deportivo ideal</h2>

                {/* Contenedor de búsqueda para móviles */}
                <div className="search-container" onClick={() => setViewFilter(true)}>
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar establecimientos..."
                        readOnly
                    />
                </div>

                {/* Contenedor de filtros para desktop */}
                <div className="filters-container">
                    {/* Filtro por Ciudad */}
                    <label htmlFor="city-filter">Ciudad:
                        <select
                            id="city-filter"
                            value={filters.city}
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                        >
                            <option value="">Todas las ciudades</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </label>

                    {/* Filtro por Deporte */}
                    <label htmlFor="sport-filter">Deporte:
                        <select
                            id="sport-filter"
                            value={filters.sport}
                            onChange={(e) => handleFilterChange('sport', e.target.value)}
                        >
                            <option value="">Todos los deportes</option>
                            {sports.map(sport => (
                                <option key={sport} value={sport}>{sport}</option>
                            ))}
                        </select>
                    </label>

                    {/* Filtro por Disponibilidad */}
                    <label htmlFor="availability-filter">Disponibilidad:
                        <select
                            id="availability-filter"
                            value={filters.availability}
                            onChange={(e) => handleFilterChange('availability', e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="available">Solo disponibles</option>
                            <option value="premium">Solo premium</option>
                        </select>
                    </label>

                    {/* Botón limpiar filtros */}
                    <div className="filter-clear">
                        <RiDeleteBin6Line
                            className='delete-filter'
                            onClick={() => setFilters({
                                city: '',
                                sport: '',
                                rating: '',
                                priceRange: '',
                                availability: 'all'
                            })}
                            title="Limpiar filtros"
                        />
                    </div>
                </div>
            </section>

            {/* Componente de filtros para móviles */}
            <FilterMovil
                viewFilter={viewFilter}
                setViewFilter={setViewFilter}
                filters={filters}
                setFilters={setFilters}
                handleFilterChange={handleFilterChange}
                cities={cities}
                sports={sports}
            />

            {/* Sección de resultados */}
            <section className="results-section">
                <div className="results-header">
                    <p>Encontrados: {facilities.length}</p>
                    <div className="icons">
                        <FiFilter />
                        <FiGrid className='active-icon' />
                        <FiList />
                    </div>
                </div>

                <div className="cards-grid">
                    {facilities.map(facility => (
                        <Card key={facility.id} facility={facility} />
                    ))}
                </div>

                {/* Mensaje cuando no hay resultados */}
                {facilities.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-content">
                            <i className="fas fa-search"></i>
                            <h3>No se encontraron establecimientos</h3>
                            <p>Intenta ajustar los filtros para encontrar más opciones.</p>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    )
}

export default Facilityes