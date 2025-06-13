import React, { useState } from 'react'

const ESTADOS_DISPONIBLES = Object.freeze({
    NO_COMPRADO: 'NO_COMPRADO',
    COMPRADO: 'COMPRADO',
    CARGANDO: 'CARGANDO'
})

const BotonComprar = ({title}) => {
    const initial_state= ESTADOS_DISPONIBLES.NO_COMPRADO
    const[estado_boton, setEstadoBoton]= useState(initial_state)
    const item = {title}

    const comprar =()=>{
        setEstadoBoton(ESTADOS_DISPONIBLES.CARGANDO)
        setTimeout(() => {
            setEstadoBoton(ESTADOS_DISPONIBLES.COMPRADO)
            alert(' felicitaciones has comprado el item:'+item)
        }, 1500);
    }

    const reset =()=>{
        setEstadoBoton(initial_state)
    }
    let content
    if(estado_boton === ESTADOS_DISPONIBLES.NO_COMPRADO){
        content = <button onClick={comprar}>Comprar</button>
    }
    else if(estado_boton === ESTADOS_DISPONIBLES.CARGANDO){
        content = <button disabled>Cargando...</button>
    }
    else{ 
        content= <button disabled>Comprado</button>
    }
  return (
    <div>
        {content}
        <button onClick={reset}
        disabled={estado_boton === ESTADOS_DISPONIBLES.CARGANDO|| estado_boton=== ESTADOS_DISPONIBLES.NO_COMPRADO}>reset</button>
    </div>
  )
}

export default BotonComprar