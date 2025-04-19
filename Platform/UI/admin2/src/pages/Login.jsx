import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleCredentialsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label>
          <span>User_ID:</span>
          <input type="text" name="email" value={credentials.email} onChange={handleCredentialsChange} />
        </label>
        <label>
          <span>Mot de passe:</span>
          <input type="password" name="password" value={credentials.password} onChange={handleCredentialsChange} />
          <div className='error-message'>{error && error}</div>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
