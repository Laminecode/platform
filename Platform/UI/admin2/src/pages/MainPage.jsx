import React, { useContext, useEffect,useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { RiEdit2Line } from 'react-icons/ri';
import { FaHome, FaUserGraduate, FaUserTie, FaCog, FaSignOutAlt, FaProjectDiagram,FaBars } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';


const MainPage = ({ etudiant }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [side_menu, setSide_menu] = useState(true);
  console.log('user: ', user);  

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`Dashboard-container ${etudiant ? 'form-displayed' : ''}`}>
      <FaBars className={side_menu ? 'side_bar_icon' : ' side_bar_icon active_side_bar_icon'} onClick={() => setSide_menu(!side_menu)}/>
      <div className={`dashboard-sidebar ${side_menu ? 'active_side hidden_side_bar' : ''}`}>
        <div className='admin_profil'>
          <div className='admin_img'>
            <img src="../public/user.png" alt=""  />
          </div>
          <h4>{user?.username}</h4>
          <RiEdit2Line className='main_page_icon' onClick={()=>{navigate('/EditProfile')}}/>
        </div>
        
        <div className='side_menu'>
          <div onClick={() => setSide_menu(false)}><NavLink to='/'><FaHome />Dashboard</NavLink></div>
          {user.superuser && <div><NavLink to='/Admin'><FaUserTie/> Administrateur</NavLink></div>}
          <div onClick={() => setSide_menu(false)}><NavLink to='/Etudiant'><FaUserGraduate /> Etudiant</NavLink></div>
          <div onClick={() => setSide_menu(false)}><NavLink to='/Encadreur'><FaUserTie /> Encadreur</NavLink></div>
          <div onClick={() => setSide_menu(false)}><NavLink to='/Projet'><FaProjectDiagram/>Projet</NavLink></div>
          <div onClick={() => setSide_menu(false)}><NavLink to='/Setting'><FaCog />Paramètres</NavLink></div>
          <button className='logout' onClick={logout}><FaSignOutAlt />Déconnecter</button>
        </div>
      </div>
      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
