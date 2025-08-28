import React from 'react';
import '../styles/History.css'
import { FaRegFutbol } from "react-icons/fa";
import { BiSolidCity } from "react-icons/bi";
import { BsCalendar2Date } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineGridView } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuHistory } from "react-icons/lu";


const History = () => {
    return (
        <section className='history'>

            {/* encabezado de historial */}
            <div className='header_history'>
                <h4 className='title_profile'><LuHistory fontSize={22} />Historial de Reservas</h4>
                <div className='btn_action'>
                    <button><MdOutlineGridView /></button>
                    <button><HiMenuAlt3 /></button>
                </div>
            </div>

            {/* Lista de historial de reservas */}
            <div className="boxs-grid">
                <article className="box">
                    <div className="header_box">
                        <h4><FaRegFutbol className='icon' />Cancha de Fútbol 2</h4>
                    </div>
                    <div className="body_box">
                        <p><BiSolidCity /><span>Club Deportivo Pucallpa</span></p>
                        <p><BsCalendar2Date /><span>20 de agosto de 2025</span></p>
                        <p><BsClock /><span>10:00 AM - 12:00 PM</span></p>
                        <p><BsCurrencyDollar /><span>120</span></p>
                        <p><FaRegFutbol /><span>Fútbol</span></p>
                    </div>
                    <div className="footer_box">
                        <p>Confirmada</p>
                    </div>
                </article>
                <article className="box">
                    <div className="header_box">
                        <h4><FaRegFutbol className='icon' />Cancha de Fútbol 2</h4>
                    </div>
                    <div className="body_box">
                        <p><BiSolidCity /><span>Club Deportivo Pucallpa</span></p>
                        <p><BsCalendar2Date /><span>20 de agosto de 2025</span></p>
                        <p><BsClock /><span>10:00 AM - 12:00 PM</span></p>
                        <p><BsCurrencyDollar /><span>120</span></p>
                        <p><FaRegFutbol /><span>Fútbol</span></p>
                    </div>
                    <div className="footer_box">
                        <p>Confirmada</p>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default History