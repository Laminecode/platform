import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { faBook, faInfoCircle, faScroll, faUsers } from '@fortawesome/free-solid-svg-icons'; // Import desired icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as utils from '../../js/utils';


function UserEncadreur({ user, setuser }) {
    const navigate = useNavigate();
    const [date, setdate] = useState([])
    useEffect(() => {
        const fetchDate = async () => {
            const respose = await utils.sendRequest('encadreur/get_date_soumission_sujet/', {}, navigate);
            setdate(respose)
        }
        fetchDate()
    }, [])

    return (
        user ? (
        <div className='E_container'>
            <div className='nav_suite'>
                <NavLink to='/user/Sujet'><div className='div_link'><FontAwesomeIcon icon={faBook} className='icon' />Projets </div></NavLink>
                <NavLink to='/user/binomes'><div className='div_link'><FontAwesomeIcon icon={faUsers} className='icon' />Binômes</div></NavLink>
                <NavLink to='/user/profile'><div className='div_link'><FontAwesomeIcon icon={faInfoCircle} className='icon' />À Propos</div></NavLink>
            </div>
            <div className='E_page'>
                <div className='side'>
                    <div className='userPicture'>
                        <img src="../images/user.png" alt="" />
                    </div>
                    <div className='more_info'>
                        <h4>{user.username}</h4>
                        <button className='editProfile' onClick={() => { navigate('editProfile') }}>Modifier Profile</button>
                    </div>
                    <div className='Date_important'>
                        <h3>Les Dates importantes</h3>
                        {date.active ? (
                            <span>
                            <span>Dernier delai pour la publication des projets: </span><br />
                            <span>{date.date}</span>
                            </span>
                        ) : (
                            <span>vous ne pouvez pas publier des projets</span>
                        )
                        }
                    </div>
                </div>
                <button className='editProfile2' onClick={() => { navigate('editProfile') }}>Modifier Profile</button>
                <div className='info'>
                    <>
                        <Outlet />
                    </>
                </div>
            </div>

        </div>
        ):(
            <div className='loading'></div>
        )
    );
}

export default UserEncadreur;
