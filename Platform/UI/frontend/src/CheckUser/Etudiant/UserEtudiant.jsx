import { faBook, faInfoCircle, faHeart, faUserTie, faUsers, faList } from '@fortawesome/free-solid-svg-icons'; // Import desired icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as utils from '../../js/utils';
import { useParams } from 'react-router-dom';

function UserEtudiants() {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => { 
    const fetchData = async () => {
      const response = await utils.sendRequest('encadreur/get_etudiant/', {matricule:user_id}, navigate);
      console.log(response);
      setUser(response.etudiant);
    };
    fetchData();
  }, []);

  return (
    user ? (
    <div className='E_container'>
      <div className='nav_suite'>             
        <NavLink to={`/ET/${user.user_id}/profile`}><div className='div_link'><FontAwesomeIcon icon={faInfoCircle} className='icon'/>À Propos</div></NavLink>
      </div>
      <div className='E_page'>
        <div className='side'>
          <div className='userPicture'>
            <img src="../../images/user.png" alt="" />
          </div>
          <div className='more_info'>
            <h3>{user.username}</h3>
          </div>
        </div>
        <div className='T_info'>
          <>
            <Outlet/>
          </>
        </div>
      </div>
    </div>
    ) : (
      <div className='loading'></div>
    )
  );
}

export default UserEtudiants;
