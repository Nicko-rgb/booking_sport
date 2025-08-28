import React from 'react';
import '../styles/dataUser.css';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const DataUser = () => {
    return (
        <section className='data-user'>
            <h4 className='title_profile'><FaRegUser /> Datos Personales</h4>
            <p>Consulta y gestiona tu información y actividad en el sistema. Para una mayor experiencia y búsqueda rápida de espacios deportivos, complete los campos que faltan.</p>
            <section className='datas'>
                <aside className="data_primary">
                    <label>Nombres:
                        <span>Linares Marco</span>
                    </label>
                    <label>Apellidos:
                        <span>Juan Martínez</span>
                    </label>
                    <label>Email:
                        <span>juan@example.com</span>
                    </label>
                    <label>Teléfono:
                        <span>123456789</span>
                    </label>
                </aside>
                <aside className="data_secondary">
                    <label>Dirección:
                        <span>---</span>
                    </label>
                    <label>Ciudad:
                        <span>Ciudad Ejemplo</span>
                    </label>
                    <label>País:
                        <span>País Ejemplo</span>
                    </label>
                    <label>Código Postal:
                        <span>---</span>
                    </label>
                    <label>Género:
                        <span>---</span>
                    </label>
                    <label>Fecha Nacimiento:
                        <span>--/--/----</span>
                    </label>
                </aside>
            </section>
            <h4 className='title_profile'><MdOutlineFavoriteBorder /> Deportes Favoritos</h4>
            <section className='favorites'>
                <div className="item">Tenis</div>
                <div className="item">Fútbol</div>
                <div className="item">Voley</div>
                <div className="item">Natación</div>
            </section>
        </section>
    )
}

export default DataUser