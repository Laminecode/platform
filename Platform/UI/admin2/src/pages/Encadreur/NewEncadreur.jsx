import React from 'react'
import {EncadreurForm} from '../../Component/Encadreur'

function NewEncadreur() {
  return (
    <div className='new_enc'>
        <div className='titre'>
            <h1>Créer un nouveau Encadreur</h1>
            <hr />
        </div>
        <EncadreurForm/>
    </div>
  )
}

export default NewEncadreur