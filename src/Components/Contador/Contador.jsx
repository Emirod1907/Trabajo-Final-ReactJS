import React, { useState } from 'react'

const Contador = () => {
  let [valor_contador, setContador]= useState(10)

  const sumar= () => {
    setContador(valor_contador+1)
  }
  const restar =() =>{
    setContador(valor_contador-1)
  }
  return (
    <div>
      <button
      onClick={restar}>-</button>
      <span>{valor_contador}</span>
      <button
      onClick={sumar}>+</button>
    </div>
  )
}

export default Contador