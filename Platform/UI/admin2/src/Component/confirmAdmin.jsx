import React from 'react';
import * as utils from '../js/utils';
import { useNavigate } from 'react-router-dom';

function Confirm({ setConfirm, confirm, id, setId }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await utils.sendRequest_with_navigate('delete_admin/', { user_id: id }, navigate, '/admin');
    setId('');
    setConfirm(false);
  };

  return (
    <div className={confirm ? 'delete_confirm' : 'hidden'}>
      <h1>Confirmation</h1>
      <p>Are you sure you want to delete this admin?</p>
      <div className='confirmation'>
        <span onClick={() => setConfirm(false)}>Cancel</span>
        <span className='delete' onClick={handleClick}>Delete</span>
      </div>
    </div>
  );
}

export default Confirm;
