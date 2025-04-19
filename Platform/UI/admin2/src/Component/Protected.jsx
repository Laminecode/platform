import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className='loading'><h4>loading...</h4></div>;

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;