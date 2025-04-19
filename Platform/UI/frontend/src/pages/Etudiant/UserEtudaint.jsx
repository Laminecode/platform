import { faBook, faInfoCircle, faHeart, faUserTie, faUsers, faList,faGraduationCap } from '@fortawesome/free-solid-svg-icons'; // Import desired icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { SelectionEtudiant } from '../../Component/sections';
import { useEffect, useState } from 'react';
import * as utils from '../../js/utils';

function UserEtudiant({ setuser, user }) {
  const navigate = useNavigate();
  const [date,setdate] = useState([])
  const [openM,setopenM] = useState(false)
  useEffect(() => {
    const fetchDate = async () => {
      const respose = await utils.sendRequest('etudiant/get_date_attribution_automatique/', {}, navigate);
      setdate(respose)
    }
    fetchDate()
  }, [])

  return (
    user ? (
    <div className='E_container'>
      <SelectionEtudiant user_id={user.user_id} openM={openM} />
      <div className='nav_suite'>
        <NavLink to={`/${user.user_id}/sujet`}><div className='div_link'><FontAwesomeIcon icon={faBook} className='icon'/>Projets</div></NavLink>
        <NavLink to={`/${user.user_id}/Encadreur`}><div className='div_link'><FontAwesomeIcon icon={faUserTie} className='icon'/>Encadreurs</div></NavLink>
        <NavLink to={`/${user.user_id}/Favorite`}><div className='div_link'><FontAwesomeIcon icon={faHeart} className='icon'/>Favoris</div></NavLink>
        <NavLink to={`/${user.user_id}/List_De_choix`}><div className='div_link'><FontAwesomeIcon icon={faList} className='icon'/>Choix</div></NavLink>              
        <NavLink to={`/${user.user_id}/profile`}><div className='div_link'><FontAwesomeIcon icon={faInfoCircle} className='icon'/>À Propos</div></NavLink>
        <NavLink to={`/${user.user_id}/PFE`}><div className='div_link'><FontAwesomeIcon icon={faGraduationCap} className='icon'/>PFE</div></NavLink>
        <ArrowDropDownIcon className='drop_icon_menu' onClick={()=>setopenM(!openM)} />
      </div>
      <div className='E_page'>
        <div className='side'>
          <div className='userPicture'>
            <img src="../images/user.png" alt="" />
          </div>
          <div className='more_info'>
            <h3>{user.username}</h3>
            <button className='editProfile' onClick={() => { navigate('editProfile') }}>Modifier Profile</button>
          </div>
          <div className='Date_important'>
              <h3>Les Dates importantes</h3>
              {date.active ? (
                <span>
                  <span>Dernier delai pour modifier la list de choix: </span><br />
                  <span>{date.date}</span>
                </span>
              ) : (
                <span>Pas de session d'attribution automatique pour le moment</span>
              )
              }
          </div>
        </div>
        <button className='editProfile2' onClick={() => { navigate('editProfile') }}>Modifier Profile</button>
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

export default UserEtudiant;
