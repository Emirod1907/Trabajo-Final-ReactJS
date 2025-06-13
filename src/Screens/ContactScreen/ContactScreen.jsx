import React from 'react'
import './style.css'
import Navbar from '../../Components/NavBar/Navbar'

const ContactScreen = () => {
  return (
    <div>
        <Navbar/>
    <div className='container'>
    <div className='form-container'>
        <h2 className='title'>Contactanos</h2>
        <form>
            <div className='input-group'>
                <label>Nombre</label>
                <input type="text" />
            </div>
            <div className="input-group">
                <label>Telefono</label>
                <input type="text" />
            </div>
            <div className="input-group">
                <label>E-mail</label>
                <input type="email" />
            </div>
            <div className="input-group" >
                <label>Mensaje</label>
                <input id="mensaje" type="textarea" />
            </div>
            <button type="submit" className="submit-button">Iniciar Sesión</button>
        </form>
    </div>
</div>
</div>
  )
}

export default ContactScreen