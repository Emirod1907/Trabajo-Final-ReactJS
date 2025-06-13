import React from 'react'
import './style.css'
import Navbar from '../NavBar/Navbar'

const Login = () => {
  return (
    <div>
        <Navbar/>
    <div className='container'>
        <div className='form-container'>
            <h2 className='title'>Login</h2>
            <form>
                <div className='input-group'>
                    <label>Username</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Contraseña</label>
                    <input type="password" />
                </div>
                <button type="submit" className="submit-button">Iniciar Sesión</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login