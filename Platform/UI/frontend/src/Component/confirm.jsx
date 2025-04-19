import React from 'react'
import * as utils from '../js/utils'
import { useNavigate } from 'react-router-dom'

function Confirm({setConfirm , confirm , onDelete}) {
 
  return (
    <div className={confirm ? 'delet_confirm' : 'hidden'}>
      <h1>Confirmation</h1>
      <p>vous avez sur de supprimer cette sujet</p>
      <div className='cofirmation'>
        <span onClick={()=>setConfirm(false)}>Cancle</span>
        <span className='delete' onClick={onDelete}>Delete</span>
      </div>
    </div>
  )
}

export default Confirm