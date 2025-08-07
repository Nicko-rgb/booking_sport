import React from 'react'
import Header from '../components/layout/header/Header'
import ClientProfile from '../components/Perfil/ClientProfile'


const Profile = () => {
  return (
    <div className="profile">
        <Header />
        <div >
          <ClientProfile />

        </div>      
    </div>
  )
}

export default Profile
