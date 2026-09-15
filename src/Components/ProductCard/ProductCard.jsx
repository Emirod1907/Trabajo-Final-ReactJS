import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import BotonComprar from '../BotonComprar/BotonComprar'

const ProductCard = ({img, title, real_price, final_price, discount, id}) => {

  return (
    <div className='product-card'>
      <div className='product-card__image'>
        <img src={img} alt={title}/>
      </div>
      <h3 className='product-card__title'>{title}</h3>
      <div className='product-card__prices'>
        <div className='price_info'>
            <span className="real_price">${real_price}</span>
            <span className="discount">%{discount}</span>
        </div>
        <span className='final_price'>${final_price}</span>
      </div>
      <div className='product-card__actions'>
        <Link className='product-card__link' to={`/producto/${id}`}>Ver detalle</Link>
        <BotonComprar productTitle={title}/>
      </div>
    </div>
  )
}

export default ProductCard
