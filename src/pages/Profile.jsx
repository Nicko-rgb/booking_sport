import { useState } from 'react';
import Header from '../shared/components/ui/Header';
import Footer from '../shared/components/ui/Footer';
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import '../modules/users/styles/profile.css';
import { FaRegUser } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { TbLiveView } from "react-icons/tb";
import { HiStatusOnline } from "react-icons/hi";
import { BiDollar } from "react-icons/bi";
// Componentes
import DataUser from '../modules/users/components/DataUser';
import History from '../modules/users/components/History';
import Preferences from '../modules/users/components/Preferences';
import EditProfile from '../modules/users/components/EditProfile';
import Modal from '../shared/components/ui/Modal';

const Profile = () => {
    const [openEdit, setOpenEdit] = useState(false)
    const [active, setActive] = useState(0);
    const tabs = [
        {
            id: 0,
            name: 'Informacion Personal',
            component: <DataUser />,
            icon: <FaRegUser strokeWidth={1} />
        },
        {
            id: 1,
            name: 'Historial',
            component: <History />,
            icon: <LuHistory strokeWidth={2.7} />
        },
        {
            id: 2,
            name: 'Preferencias',
            component: <Preferences />,
            icon: <GoGear strokeWidth={1.1} />
        }
    ]

    // Funcion para abrir y cerrar Editar Perfil
    const handleEdit = () => {
        setOpenEdit(!openEdit)
    }


    return (
        <div className="profile_page">
            <Header />
            <main>
                <section>
                    <div className="profile">
                        <aside className="box_info">
                            <img src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg" alt="Foto Perfil" />
                            <div>
                                <h2>Martinez Rodriguez</h2>
                                <p className="email">martines.rodri9@gmail.com</p>
                                <p className="date-user">Desde 12/05/2025</p>
                            </div>
                        </aside>
                        <div className="box_accions">
                            <button onClick={handleEdit}>Editar<MdOutlineEdit /></button>

                        </div>
                    </div>
                    <div className="estadistica_profile">
                        <aside>
                            <LuCalendarCheck2 />
                            <div>
                                <h4>12</h4><span>Reservas</span>
                            </div>
                        </aside>
                        <aside>
                            <TbLiveView />
                            <div>
                                <h4>16 de agosto</h4><span>Última Reserva</span>
                            </div>
                        </aside>
                        <aside>
                            <HiStatusOnline />
                            <div>
                                <h4>2</h4><span>Pendientes</span>
                            </div>
                        </aside>
                        <aside>
                            <BiDollar />
                            <div>
                                <h4>720</h4><span>Total Gasto</span>
                            </div>
                        </aside>
                        <aside>
                            <LuCalendarCheck2 />
                            <div>
                                <h4>12</h4><span>Texto</span>
                            </div>
                        </aside>
                    </div>
                </section>
                <section className='options_menu'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={active === tab.id ? 'active' : ''}
                            onClick={() => setActive(tab.id)}
                        >
                            {tab.icon} <span>{tab.name}</span>
                        </button>
                    ))}
                </section>

                {/* Renders de componentes */}
                {tabs[active]?.component}
            </main>
            <Footer />

            {/* Modal Editar Perfil */}
            <Modal
                isOpen={openEdit}
                onClose={handleEdit}
                title="Editar Perfil"
                size='medium'
                headerColor='primary'
            >
                <EditProfile />
            </Modal>

        </div>
    )
}

export default Profile
