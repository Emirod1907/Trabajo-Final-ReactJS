import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import getProducts from '../../services/productService'
import Navbar from '../NavBar/Navbar'
import './style.css'

const ProductList = () => {
    const [products, setProducts]= useState([])
    const [loading, setLoading]=useState(true)
    const [error, setError]= useState(false)
    
    const getProductsList = async()=>
    {
        setLoading(true)
        setTimeout(
                    async ()=>{
                        const product_list_response= await getProducts()
                        if (product_list_response){
                            setProducts(product_list_response)
                        }
                        else{
                            setError('error al obtener productos')
                        }
                        setLoading(false)
                    },2000
                )
    }
        
    
    useEffect(
        ()=>{
            getProductsList()
        },[]
    )
     
    const componentes = products.map(
        (product)=>{
            return <ProductCard {...product} key={product.id}/>
        }
    )
    let content
    if(loading){
        content = <h2>Cargando...</h2>
    }
    else {
        if(error){
        content=<h2>{error}</h2>
        }
        else{
                content=(
                    <div className='product-grid'>
                        {componentes}
                    </div>
                    )
        }
    }

  return (
        <div>{content}</div>
  )
}

export default ProductList