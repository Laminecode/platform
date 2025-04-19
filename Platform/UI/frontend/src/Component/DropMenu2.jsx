import React from 'react'
import * as utils from '../js/utils'
import { useNavigate } from 'react-router-dom'

function DropMenu2({open2}) {
  const navigate = useNavigate()
    const handleLogout= async()=>{
      const response = utils.sendRequest('encadreur/logout/',{},navigate)
      navigate('/logout')
      utils.remove_session_info()
    }
  return (
    <div className={`drop_menu2 ${open2 ? 'open2' : ''}`}>
        <ul>
            <li>Profile</li>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    </div>  
  )
}

export default DropMenu2