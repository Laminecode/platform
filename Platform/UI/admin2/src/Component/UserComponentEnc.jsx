import React from 'react'
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function UserComponentEnc({onclick,item}) {
    const navigator = useNavigate()
  return (
    item && 
    <div className='line'>
        <div className='user'>
            <div className='profile'>
                <img src="../public/user.png" alt=""  />
            </div>
            <div className='details'>
                <h1 className='name'>{item.username}</h1>
                <h3 className='user_id'>{item.user_id}</h3>
            </div>
        </div>
        <div className='status'>
            <span className={item.visible ? 'visible' : 'invisible'}></span>
            {item.visible ? <p>visible</p> : <p>invisible</p>}
        </div>
        <div className='level'>
            <p>{item.type}</p>
        </div>
        <div className='specialite'>
            <p>{item.type == 'interne' ? item.specialite : item.societe}</p>
        </div>
        <div className='action'>
            <div className='icon'>
                <RiEdit2Line onClick={()=> navigator(`/${item.user_id}/EditEnc`)}/>
            </div>
            <div className='icon'>
                <RiDeleteBinLine onClick={onclick}  />
            </div>
        </div>
    </div>
  )
}

export default UserComponentEnc