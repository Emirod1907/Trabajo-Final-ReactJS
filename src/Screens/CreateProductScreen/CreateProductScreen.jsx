import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import database from '../../../config/firebase'
import Navbar from '../../Components/NavBar/Navbar'

const CreateProductScreen = () => {
    let initial_state_form = {
        title:'',
        real_price: 0,
        final_price: 0,
        discount: 0,
        description:'',
        img: null,
    }
    const [form_state, setFormState] = useState(initial_state_form)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) =>{
        let field = event.target.name
        let new_value = event.target.value
        if(field === 'img'){
            setFormState(
                (prev_state) =>{
                    return{
                        ...prev_state,
                        'img': event.target.files[0]
                    }
                }
            )
        }
        else{
            setFormState(
                (prev_state) => {
                    return {
                    ...prev_state, 
                    [field]: new_value
                    }
                }
            )
        }
    }
    const uploadImgToImgBB = async(img_file) =>{
        let API_KEY_IMGBB= '26c5a59f4d3c46da1f28367e1519bfd6'
        const form_data = new FormData()
        form_data.append('image',img_file)
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
            {
                method: 'POST',
                body: form_data
            }
        )
        const data = await response.json()
        console.log('Respuesta de IMGBB:', data)
        return data.data.url
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        setLoading(true)

        const url_img = await uploadImgToImgBB(form_state.img)
        console.log(url_img)
        const collection_reference = collection(database, 'products')
        await addDoc(
            collection_reference,
            {
                title: form_state.title,
                real_price: form_state.real_price,
                final_price: form_state.final_price,
                discount: form_state.discount,
                description: form_state.description,
                img: url_img
            }
        )
        alert("Producto creado exitosamente!!")
        setFormState(initial_state_form)
        setLoading(false)
    }
    return (
    <div>
        <div><Navbar/></div>
        <div className='container'>
        <form className='form-container' onSubmit={handleSubmit}>
            <h1>Crea tu producto</h1>
            <div>
                <div className='input-group'>
                    <label htmlFor="title">Titulo del Producto</label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    required 
                    value = {form_state.title}
                    onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="real_price">Precio real del Producto</label>
                    <input 
                    type="number" 
                    name="real_price" 
                    id="real_price" 
                    required
                    value={form_state.real_price}
                    onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="final_price">Precio Final del Producto</label>
                    <input 
                    type="number" 
                    name="final_price" 
                    id="final_price" 
                    required
                    value={form_state.final_price= form_state.real_price-form_state.real_price*(form_state.discount/100)}
                    onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="discount">Descuento del Producto</label>
                    <input 
                    type="number" 
                    name="discount" 
                    id="discount" 
                    required
                    max={99}
                    value={form_state.discount}
                    onChange={handleChange}
                    />
                </div>
                    <div className='input-group'>
                    <label htmlFor="description">Descripción del Producto</label>
                    <input 
                    type="text" 
                    name="description" 
                    id="description" 
                    required
                    max={100}
                    value={form_state.description}
                    onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="img">Imagen del Producto</label>
                    <input 
                    type="file" 
                    name="img" 
                    id="img" 
                    required
                    onChange={handleChange}
                    />
                </div>
                <div><button 
                onSubmit={handleSubmit}
                className='submit-button'
                type='submit'
                disabled={loading}>{ loading ? "Creando producto" :"Crear Producto"}</button></div>
            </div>
        </form>
        </div>
    </div>
  )
}

export default CreateProductScreen