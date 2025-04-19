import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as utils from '../js/utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>
   {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session = utils.get_session_info();
      if (session) {
        try {
          const response = await utils.sendRequest('get_profil/', {}, navigate);
          setUser(response.admin);
        } catch (error) {
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8000/platform/admin/login/', credentials);
      console.log('osdjfksadjf',response)
      if (response.data.success === true) {
        utils.store_session_info(response.data.session);
        const data = await utils.sendRequest('get_profil/', {}, navigate);
        setUser(data.admin);
        navigate('/');
      } else {
        setError('Incorrect username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const logout = async () => {
    await utils.sendRequest_with_navigate('logout/', {}, navigate, '/login');
    setUser(null);
    setError('');
    setLoading(false);
    utils.clear_session_info();
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
