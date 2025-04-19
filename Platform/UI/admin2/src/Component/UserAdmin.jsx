import React from 'react';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function UserComponentAdmin({ onClick, item }) {
  const navigate = useNavigate();
  console.log(item)
  return (
    // item && 
    <div className='line'>
      <div className='user-admin'>
          <div className='profile'>
            <img src='../public/user.png' alt="Profile" />
          </div>
          <div className='details'>
            <h1 className='name'>{item.admin.username}</h1>
            <h3 className='user_id'>{item.admin.user_id}</h3>
          </div>
        </div>
      {/* <div className='password'>
        <p className='password'>{item.admin.password}</p>
      </div> */}
      <div className='action'>
        <div className='icon'>
          <RiEdit2Line onClick={() => navigate(`/${item.admin.user_id}/EditAmin`)} />
        </div>
        <div className='icon'>
          <RiDeleteBinLine onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

export default UserComponentAdmin;
