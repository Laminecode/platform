import { RiEdit2Line, RiDeleteBinLine, RiGroupLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function UserComponent({onclick,etu}) {
    const navigate = useNavigate()
  return (
    etu && 
    <div className='line'>
        <div className='user'>
            <div className='profile'>
                <img src="../public/user.png" lt="" />
            </div>
            <div className='details'>
                <h1 className='name'>{etu.etudiant.username}</h1>
                <h3 className='user_id'>{etu.etudiant.user_id}</h3>
            </div>
        </div>
        <div className='status'>
            <span className={etu.groupe.active ? 'visible' : ''}></span>
            {etu.groupe.active ? <p>active</p> : <p>inactive</p>}
        </div>
        <div className='specialite'>
            <p>{etu.groupe.specialite}</p>
        </div>
        <div className='action'>
            <div className='icon'>
                <RiEdit2Line onClick={()=>navigate(`/${etu.etudiant.user_id}/Edit`)}/>
            </div>
            <div className='icon'>
                <RiGroupLine onClick={()=>navigate(`/${etu.etudiant.user_id}/Groupe`)}/>
            </div>
        </div>
    </div>
  )
}

function UserComponent2({onclick,etu,groupe}) {
    const navigate = useNavigate()
  return (
    etu && 
    <div className='line'>
        <div className='user'>
            <div className='profile'>
                <img src="../public/user.png" lt="" />
            </div>
            <div className='details'>
                <h1 className='name'>{etu.etudiant.username}</h1>
                <h3 className='user_id'>{etu.etudiant.user_id}</h3>
            </div>
        </div>
        <div className='status'>
            <span className={groupe.active ? 'visible' : ''}></span>
            {groupe.active ? <p>actif</p> : <p>inactif</p>}
        </div>
        <div className='specialite'>
            <p>{groupe.specialite}</p>
        </div>
        <div className='action'>
            <div className='icon'>
                <RiEdit2Line onClick={()=>navigate(`/${etu.etudiant.user_id}/Edit`)}/>
            </div>
            <div className='icon'>
                <RiGroupLine onClick={()=>navigate(`/${etu.etudiant.user_id}/Groupe`)}/>
            </div>
        </div>
    </div>
  )
}

export  {UserComponent,UserComponent2};