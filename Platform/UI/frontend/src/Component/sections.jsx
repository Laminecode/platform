import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faHeart, faUserTie, faUsers, faList } from '@fortawesome/free-solid-svg-icons'; // Import desired icons
import { NavLink } from 'react-router-dom'

function SelectionEncadreur({open2}) {
  return (
    <div className={`drop_menu2 ${open2 ? 'open' : ''}`}>
        <ul>
            <li><NavLink to='/user/Sujet'><div className='div_link'><FontAwesomeIcon icon={faBook} className='icon' />Projets </div></NavLink></li>
            <li><NavLink to='/user/binomes'><div className='div_link'><FontAwesomeIcon icon={faUsers} className='icon' />Binomes</div></NavLink></li>
            <li><NavLink to='/user/profile'><div className='div_link'><FontAwesomeIcon icon={faInfoCircle} className='icon' />À Propos</div></NavLink></li>
        </ul>
    </div>  
  )
}


function SelectionEtudiant({openM,user_id}) {
  return (
    <div className={`drop_menu ${openM ? 'openM' : ''}`}>
        <ul>
            <li><NavLink to={`/${user_id}/sujet`}><div className='div_link'><FontAwesomeIcon icon={faBook} className='icon'/>Projets</div></NavLink></li>
            <li><NavLink to={`/${user_id}/Encadreur`}><div className='div_link'><FontAwesomeIcon icon={faUserTie} className='icon'/>Encadreurs</div></NavLink></li>
            <li><NavLink to={`/${user_id}/Favorite`}><div className='div_link'><FontAwesomeIcon icon={faHeart} className='icon'/>Favorites</div></NavLink></li>
            <li><NavLink to={`/${user_id}/List_de_choix`}><div className='div_link'><FontAwesomeIcon icon={faList} className='icon'/>Choix</div></NavLink></li>
            <li><NavLink to={`/${user_id}/profile`}><div className='div_link'><FontAwesomeIcon icon={faInfoCircle} className='icon'/>À Propos</div></NavLink></li>
        </ul>
    </div>  
  )
}


              


export {SelectionEncadreur,SelectionEtudiant}