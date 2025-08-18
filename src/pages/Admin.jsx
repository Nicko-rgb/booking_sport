import React, { useState } from 'react';
import '../modules/admin/styles/admin.css';

// Admin components
import AdminSidebar from '../modules/admin/components/AdminSidebar';
import DashboardOverview from '../modules/admin/components/DashboardOverview';
import ReservationsManagement from '../modules/admin/components/ReservationsManagement';
import ScheduleManagement from '../modules/admin/components/ScheduleManagement';
import PricingManagement from '../modules/admin/components/PricingManagement';
import FacilitySettings from '../modules/admin/components/FacilitySettings';
import ReportsAnalytics from '../modules/admin/components/ReportsAnalytics';

// Icons
import { FiMenu, FiX } from 'react-icons/fi';

const Admin = () => {
    // Estado para la sección activa del panel de administración
    const [activeSection, setActiveSection] = useState('dashboard');

    // Estado para el sidebar móvil
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Función para renderizar el contenido según la sección activa
    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'reservations':
                return <ReservationsManagement />;
            case 'schedules':
                return <ScheduleManagement />;
            case 'pricing':
                return <PricingManagement />;
            case 'settings':
                return <FacilitySettings />;
            case 'reports':
                return <ReportsAnalytics />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="admin">
            {/* Sidebar de navegación */}
            <AdminSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Contenido principal */}
            <main className={`admin-main ${sidebarOpen ? 'admin-main-collapse' : ''}`}>
                {renderContent()}
            </main>
        </div>
    );
};

export default Admin;