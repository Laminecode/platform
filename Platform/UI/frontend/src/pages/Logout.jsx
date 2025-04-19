import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as utils from '../js/utils.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Logout({ setuser }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    user_id: '',
    password: '',
    type: 'etudiant' // Default type
  });

  const handleInputLogin = (event) => {
    const { name, value } = event.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        type: loginInfo.type,
        password: loginInfo.password
      };
      let url = '';
      if (loginInfo.type === 'encadreur') {
        data.email = loginInfo.user_id; // Using 'email' for 'encadreur'
        url = 'http://localhost:8000/platform/encadreur/login/';
      } else {
        data.matricule = loginInfo.user_id; // Using 'matricule' for 'etudiant'
        url = 'http://localhost:8000/platform/etudiant/login/';
      }

      const response = await axios.post(url, data);
      if (response.data.success) {
        console.log(response.data.session);
        utils.store_session_info(response.data.session);
        utils.store_type(data.type);
        if (data.type === 'encadreur') {
          navigate('/user/sujet');
        } else if (data.type === 'etudiant') {
          navigate(`/${response.data.session.id}/sujet`);
        }
      } else {
        if (data.type === 'encadreur') {
          setError("mot de pass ou email invalide");
        } else {
          setError('mot de pass ou matricule invalide');
        }
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  useEffect(() => {
    const session = utils.get_session_info();
    if (session) {
      if (session.type === 'encadreur') {
        navigate('/user/sujet');
      } else if (session.type === 'etudiant') {
        navigate(`/${session.id}/sujet`);
      }
    }
  }, []);

  return (
    <section className='section'>
      <div className="logo logo2">
        <div className="logo-icon logo-icon2 ">PL</div> {/* Logo icon */}
        ProjectLink
      </div>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <select name="type" value={loginInfo.type} onChange={handleInputLogin}>
                <option value="etudiant">Etudiant</option>
                <option value="encadreur">Encadreur</option>
              </select>
            </div>
            <div className="inputbox">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                name="user_id"
                required
                value={loginInfo.user_id}
                onChange={handleInputLogin}
              />
              <label>{loginInfo.type === 'encadreur' ? 'Email' : 'Matricule'}</label>
            </div>
            <div className="inputbox motpass">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                name="password"
                required
                value={loginInfo.password}
                onChange={handleInputLogin}
              />
              <label>Mot de pass </label>
            </div>
            <div className='error'>{error}</div>
            <button type="submit" className='submit'>Log In</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Logout;
