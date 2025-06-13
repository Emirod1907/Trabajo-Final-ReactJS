import React, { useEffect, useState } from 'react'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)


  const obtenerProductos = async() => {
    const respuesta = await fetch('http://localhost:5173/productos.json')
    const data = await respuesta.json()
    setProductos(data)
  }
  useEffect(
    ()=>{
      obtenerProductos()
    },[]
  )
  return (
    <div>Productos de limpieza</div>
  )
}

export default Productos