import React from 'react'
import * as utils from '../js/utils'
import { useNavigate } from 'react-router-dom'

function Confirm({setConfirm , confirm ,id,setId}) {
  const navigate = useNavigate()
  const handleClick = async() =>{
    const response = await utils.sendRequest('delete_encadreur/',{email:id},navigate)
    setId('')
    setConfirm(false)
  }
  return (
    <div className={confirm ? 'delet_confirm' : 'hidden'}>
      <h1>Confirmation</h1>
      <p>vous avez sur de supprimer cette encadreur</p>
      <div className='cofirmation'>
        <span onClick={()=>setConfirm(false)}>Cancle</span>
        <span className='delete' onClick={handleClick}>Delete</span>
      </div>
    </div>
  )
}

export default Confirm