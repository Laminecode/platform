import React from 'react'
import { NavLink } from 'react-router-dom'

function Binome({binome}) {
    console.log(binome)
    
  return (
    <div className='binome'>
        <div>
            <h2 className='binome_titre'><NavLink to={`/E/${binome.sujet.id}/${binome.sujet.titre}`}>{binome.sujet.titre}</NavLink></h2>
        </div>
        <div className='binomes_membre'>
            <div className='binome_etu'>
                <div className='binome_profile'>
                    <img src="../images/user.png" alt="" />
                </div>
                <h4><NavLink to={`/ET/${binome.etudiants[0].etudiant.user_id}/profile`} >{binome.etudiants[0].etudiant.username}</NavLink></h4>
            </div>
            <div className='binome_etu'>
                <div className='binome_profile'>
                    <img src="../images/user.png" alt="" />
                </div>
                <h4><NavLink to={`/ET/${binome.etudiants[1].etudiant.user_id}/profile`}>{binome.etudiants[1].etudiant.username}</NavLink></h4>
            </div>
        </div>
    </div>
  )
}

export default Binome