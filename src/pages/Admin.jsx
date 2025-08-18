import React from 'react'
import "../styles/admin/Admin.css"
const Admin = () => {
  return (
  <>
  <div className='body'>

  <nav class="sidebar">
    {/* Ruta de Imagen  */}
    <img src="https://via.placeholder.com/150" alt="Logo" className="logo" />
    
    {/* Menu y Opciones */}
        <h2>Sport Booking</h2>
        
        <ul>
            <li><a href="#">Canchas</a></li>
            <li><a href="#">Reservas</a></li>
            <li><a href="#">Clientes</a></li>
            <li><a href="#">Pagos</a></li>
            <li><a href="#">Usuarios</a></li>
            <li><a href="#">Promociones</a></li>
            <li><a href="#">Reportes</a></li>
            <li><a href="#">Configuración</a></li>
        </ul>
    </nav>
    <div class="content">
        <header>
            <h1>Panel Administrativo</h1>
            <div>Usuario: Admin</div>
        </header>
        <section class="grid">
            <div class="card">
                <h3>Reservas Hoy</h3>
                <p>15</p>
            </div>
            <div class="card">
                <h3>Ingresos Mensuales</h3>
                <p>$1200</p>
            </div>
            <div class="card">
                <h3>Canchas Disponibles</h3>
                <p>5</p>
            </div>
            <div class="card">
                <h3>Clientes Activos</h3>
                <p>42</p>
            </div>
        </section>
    </div>
  </div>
  
  </>

  ) 
}

export default Admin
