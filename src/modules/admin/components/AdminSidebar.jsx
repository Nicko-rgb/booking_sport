import React from 'react';
import '../styles/AdminSidebar.css'
import { FiHome, FiCalendar, FiClock, FiDollarSign, FiSettings, FiBarChart2 } from 'react-icons/fi';
import { MdSportsFootball } from 'react-icons/md';
import { HiLogin } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";


const AdminSidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
    // Opciones del menú de administración
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Panel Principal',
            icon: <FiHome />,
        },
        {
            id: 'reservations',
            label: 'Reservas',
            icon: <FiCalendar />,
        },
        {
            id: 'schedules',
            label: 'Horarios',
            icon: <FiClock />,
        },
        {
            id: 'pricing',
            label: 'Precios',
            icon: <FiDollarSign />,
        },
        {
            id: 'settings',
            label: 'Configuración',
            icon: <FiSettings />,
        },
        {
            id: 'reports',
            label: 'Reportes',
            icon: <FiBarChart2 />,
        }
    ];

    // Función para manejar el cambio de sección
    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        setSidebarOpen(false); // Cerrar sidebar en móvil
    };

    return (
        <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-oculto' : ''}`}>
            <h4>Menú</h4>
            <span onClick={() => setSidebarOpen(!sidebarOpen)}><HiLogin className={sidebarOpen ? 'icon-rotate' : ''} /></span>
            {menuItems.map((item) => (
                <aside
                    key={item.id}
                    className={`item.menu ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleSectionChange(item.id)}
                >
                    {item.icon}
                    <p className="txt">{item.label}</p>
                </aside>

            ))}
            {/* Footer del sidebar */}
            <aside className='close-sesion'>
                <RiLogoutCircleRLine />
                <p>Cerrar Sesion</p>
            </aside>
        </aside>
    );
};

export default AdminSidebar;