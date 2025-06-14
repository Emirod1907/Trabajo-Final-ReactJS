import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import BotonComprar from '../BotonComprar/BotonComprar'

const ProductCard = ({img, title, real_price, final_price, discount,id}) => {

  return (
    <div className='wrapper'>
      <div className='conteiner'>
        <div className='image-conteiner'><img src={img}/></div>
        <h3> {title}</h3>
        <div className='price_info'>
            <span className="real_price">${real_price}</span>
            <span className="discount">%{discount}</span>
        </div>
        <span className='final_price'>${final_price}</span>
        <Link to={`/producto/${id}`}>Ver detalle</Link>
        <div><BotonComprar productTitle={title}/></div>
      </div>
      
    </div>
  )
}

export default ProductCard