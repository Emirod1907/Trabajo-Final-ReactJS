import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Navbar = () => {
  return (
    <header className='navbar_header'>
        <h2>
            <nav>
                <Link className='link' to={'/'}>Home</Link>
                <Link className='link' to={'/registro'}>Registro</Link>
                <Link className='link' to={'/login'}>Login</Link>
                <Link className='link' to={'/product/new'}>Create Product </Link>
            </nav>
        </h2>
    </header>
)
}

export default Navbar