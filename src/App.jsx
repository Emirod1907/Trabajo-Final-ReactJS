import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Registro } from './Components/Registro/Registro'
import Login from './Components/Login/Login'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import ProductDetailScreen from './Screens/ProductDetailScreen/ProductDetailScreen'
import CreateProductScreen from './Screens/CreateProductScreen/CreateProductScreen'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen/>}/>
      <Route path='/registro' element={<Registro/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/producto/:product_id' element={<ProductDetailScreen/>}/>
      <Route path='product/new' element={<CreateProductScreen/>}/>
    </Routes>

  )
}

export default App