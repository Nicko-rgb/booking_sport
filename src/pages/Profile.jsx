import React from 'react'
import Header from '../shared/components/ui/Header'
import ClientProfile from '../modules/users/components/ClientProfile'


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
