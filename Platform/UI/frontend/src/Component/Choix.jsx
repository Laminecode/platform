import React from 'react';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function Choix({ projet, onRemoveFromChoix,able }) {
  return (
    <div className="choix-item">
      <h2><NavLink to={`/${projet.sujet.id}/${projet.sujet.titre}`}>{projet.sujet.titre}</NavLink></h2>
      <p>Type: {projet.sujet.type}</p>
      <p>Encadreur: <NavLink to={`/E/${projet.encadreur.user_id}/Profile`}>{projet.encadreur.username}</NavLink></p>
       {able && <CheckCircleIcon
        onClick={() => onRemoveFromChoix(projet.sujet.id)}
        style={{ color: 'red', cursor: 'pointer' }}
        className='remove-from-choix'
      />}
    </div>
  );
}

export default Choix;
