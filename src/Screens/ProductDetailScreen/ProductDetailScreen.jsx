import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../services/productService'
import Navbar from '../../Components/NavBar/Navbar'
import BotonComprar from '../../Components/BotonComprar/BotonComprar'
import'./style.css'

const ProductDetailScreen = () => {
    const [products, setProducts]= useState(null)
    const [loading, setLoading]=useState(true)
    const [error, setError]= useState(false)
    const {product_id} = useParams()
    console.log("Product ID:"+product_id)

    const getProductDetail = async()=>
        {
            setLoading(true)
            setTimeout(
                        async ()=>{
                            const product_detail_response= await getProductById({product_id})
                            if (product_detail_response){
                                setProducts(product_detail_response)
                            }
                            else{
                                setError('error al buscar producto')
                            }
                            setLoading(false)
                        },2000
                    )
        }

    useEffect(
        ()=>{
            getProductDetail()
        },[product_id]
    )
     

    let content
        if(loading){
                    content = <h2>Cargando...</h2>
    }
    else {
            if(error){
            content=<h2>{error}</h2>
            }
        else if(products){
            content= 
            <div className='conteiner'>
                <h1> {products.title} </h1>
                <div className='img-conteiner'>
                    <img src={products.img}/>
                </div>
                <div className='price_info'>
                    <span className="real_price">${products.real_price}</span>
                    <span className="discount">%{products.discount}</span>
                </div>
                <span className='final_price'>${products.final_price}</span>
                <div className='description'>${products.description}</div>
                <BotonComprar productTitle={products.title}/>
            </div>
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='product-detail-conteiner'>
            {content}
        </div>
    </div>
  )
}

export default ProductDetailScreen