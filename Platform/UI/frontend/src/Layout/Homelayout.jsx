import React, { useState, useEffect } from 'react';
import DropMenu2 from '../Component/DropMenu2';
import NotificationMenu from '../Component/NotificationMenu';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import * as utils from '../js/utils.js';


function HomeLayout({ user, setuser,notifications,setnotifications }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [notify, setnotify] = useState(false);

    const handleDrop = () => {
        setOpen(!open);
    };

    const handleDrop2 = () => {
        setOpen2(!open2);
    };

    const login = (bool) => {
        navigate('/Logout', { state: { bool } });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const type = utils.get_type();
            if (type === 'encadreur') {
                const response = await utils.fetchData();
                setuser(response.encadreur);
                navigate(`user/sujet`);
            } else if (type === 'etudiant') {
                const response = await utils.sendRequest('etudiant/get_profil/', {},navigate);
                const groupedResponse = {
                    id: response.groupe.id,
                    user_id: response.etudiant.user_id,
                    username: response.etudiant.username,
                    outils: response.etudiant.outils,
                    preferences: response.etudiant.preferences,
                    active: response.groupe.active,
                    annee: response.groupe.annee,
                    specialite: response.groupe.specialite,
                    palier: response.groupe.palier,
                };
                console.log(groupedResponse);
                setuser(groupedResponse);
                navigate(`/${response.etudiant.user_id}/sujet`);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className='loading'></div>;
    }

    return (
        <>
            <header>
                <nav className='nav'>
                    <div className="logo">
                        <div className="logo-icon">PL</div> {/* Logo icon */}
                        ProjectLink
                    </div>
                    {!user ? (
                        <>
                            <div className='links'>
                                <NavLink to="/" end>Accueil</NavLink>
                                <NavLink to="/profile">À propos</NavLink>
                                <NavLink to="/features">services</NavLink>
                            </div>
                            <div className='join'>
                                <button className='bsignup' onClick={() => login(false)}>
                                    Log in
                                </button>
                            </div>
                            <div className='toggel-btn'>
                                <FontAwesomeIcon icon={faBars} onClick={handleDrop} />
                            </div>
                            <div className={`drop_menu ${open ? 'open' : ''}`}>
                                <ul>
                                    <li><NavLink to="/" end>Home</NavLink></li>
                                    <li><NavLink to="/profile">About</NavLink></li>
                                    <li><NavLink to="/features">Features</NavLink></li>
                                    <li onClick={() => login(false)}>Log in</li>
                                    <li onClick={() => login(true)}>Join</li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className='connection_nav'>
                            <div className='Notification' alt='notification'>
                                {notifications && notifications.length > 0 ? <span className='notify_alert'></span>: <span></span>}
                                <FontAwesomeIcon icon={faBell} className='Notif_Icon' onClick={() => { setnotify(!notify) }} />
                                <NotificationMenu open3={notify} notifications={notifications} setnotifications={setnotifications} user={user} />
                            </div>
                            <div className='userNavPicture' onClick={handleDrop2}>
                                 <img src="../images/user.png" alt="" />
                            </div>
                            <div className='userNavName'>
                                {user.username}
                            </div>
                            <DropMenu2 open2={open2} />
                        </div>
                    )}
                </nav>
            </header>
            <Outlet />
        </>
    );
}

export default HomeLayout;
