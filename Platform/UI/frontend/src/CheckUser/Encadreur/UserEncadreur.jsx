import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useParams } from 'react-router-dom';
import { faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import * as utils from '../../js/utils';

function UserEncadreurs() {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await utils.sendRequest('etudiant/get_encadreur/', { user_id }, navigate);
                console.log(response)
                setUser(response.encadreur);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, [user_id, navigate]);

    const handleAddToFavorites = async () => {
        const response = await utils.sendRequest('etudiant/add_encadreur_favoris/', { user_id: user_id }, navigate);
        setUser({ ...user, is_favoris: true });
      };
    const handleRemoveFavorite = async() => {
        const response = await utils.sendRequest('etudiant/delete_encadreur_favoris/', { user_id: user_id }, navigate);
        setUser({ ...user, is_favoris: false });
    }

    return (
        user ? (
            <div className='E_container'>
                <div className='nav_suite'>
                    <NavLink to={`/E/${user.user_id}/Sujet`}>
                        <div className='div_link'>
                            <FontAwesomeIcon icon={faBook} className='icon' />
                            Projets
                        </div>
                    </NavLink>
                    <NavLink to={`/E/${user.user_id}/Profile`}>
                        <div className='div_link'>
                            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
                            À Propos
                        </div>
                    </NavLink>
                </div>
                <div className='E_page'>
                    <div className='side'>
                        <div className='userPicture'>
                            <img src="../../images/user.png" alt="" />
                        </div>
                        <div className='more_info'>
                            <h4>{user.username}</h4>
                            {user.is_favoris ? (
                                <button className='editProfile' onClick={handleRemoveFavorite}>
                                <FontAwesomeIcon icon={faStar}style={{ color: 'gold' }} />
                                Ajouter aux favoris
                                </button>
                                ) : (
                                <button className='editProfile' onClick={handleAddToFavorites}>
                                <FontAwesomeIcon icon={faStar} />
                                Ajouter aux favoris
                                </button>
                                )}
                        </div>
                    </div>
                        {user.is_favoris ? (
                        <button className='editProfile2' onClick={handleRemoveFavorite}>
                        <FontAwesomeIcon icon={faStar}  style={{ color: 'gold' }} />
                        Ajouter aux favoris
                        </button>
                        ) : (
                        <button className='editProfile2' onClick={handleAddToFavorites}>
                        <FontAwesomeIcon icon={faStar}  />
                        Ajouter aux favoris
                        </button>
                        )}
                    <div className='info'>
                        <Outlet />
                    </div>
                </div>
            </div>
        ) : (
            <div className='loading'>Loading...</div>
        )
    );
}

export default UserEncadreurs;
