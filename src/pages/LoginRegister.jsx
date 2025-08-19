import React from 'react'
import LoginRegisterComponent from '../modules/auth/components/LoginRegister'
import Header from '../shared/components/ui/Header'

const LoginRegister = () => {
  return (
    <>
      <Header />
      <LoginRegisterComponent />
    </>
  )
}

export default LoginRegister