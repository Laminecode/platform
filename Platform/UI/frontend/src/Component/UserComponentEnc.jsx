import React from 'react';
import { NavLink } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserComponentEnc({ onclick, item, onremove, isFavoris }) {
  return (
    item && 
    <div className='line'>
      <div className='user'>
        <div className='profile'>
          <img src="../images/user.png" alt="" />
        </div>
        <div className='userdetails'>
          <h1 className='name'>
              <NavLink to={`/E/${item.user_id}/Profile`} >{item.username}</NavLink>
          </h1>
          <h3 className='user_id'>{item.user_id}</h3>
        </div>
      </div>
      <div className='level'>
        <p>{item.type}</p>
      </div>
      <div className='specialite'>
        <p>{item.type === 'interne' ? item.specialite : item.societe}</p>
      </div>
      <div className='action'>
        {isFavoris ? (
          <FontAwesomeIcon onClick={onremove} icon={faStar} style={{ color: 'gold' }} />
        ) : (
          <FontAwesomeIcon onClick={onclick} icon={faStar} />
        )}
      </div>
    </div>
  );
}

export default UserComponentEnc;
