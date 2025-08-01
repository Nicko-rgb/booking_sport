import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
                                //Componente donde se Instancian vistas de otros 
const main = ({component}) => {
  return (
    <div>
            <Header/>
            {component}
            <Footer/>
    </div>
  )
}

export default main