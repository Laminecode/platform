import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as utils from '../../js/utils';
import { message } from 'antd';

const AdminPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    user_id: '',
    password: '',
    new_user_id: '',
    username: '',
    new_password: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      console.log('email', email);
      message.error('Veuillez entrer une adresse email valide.');
      return false;
    }
    return true;
  };
  useEffect(() => {
    const fetchAdmin = async () => {
      if (user_id) {
        setLoading(true);
        setIsEdit(true);
        try {
          const response = await utils.sendRequest('get_admin/', { user_id }, navigate);
          setFormData({
            ...formData,
            user_id: response.admin.user_id,
            new_user_id: response.admin.user_id,
            username: response.admin.username,
            new_password: response.admin.password
          });
        } catch (err) {
          setError('An error occurred while fetching admin data');
        }
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [user_id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.user_id)
    if(user_id){
      if (!validateEmail(formData.new_user_id)) return;
    }else{
      if (!validateEmail(formData.user_id)) return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await utils.sendRequest('set_admin/', {
          user_id: formData.user_id,
          new_user_id: formData.new_user_id,
          username: formData.username,
          password: formData.new_password
        }, navigate);
      } else {
        await utils.sendRequest('creer_admin/', {
          nom: formData.nom,
          prenom: formData.prenom,
          user_id: formData.user_id,
          password: formData.password
        }, navigate);
      }
      navigate('/Admin');
    } catch (err) {
      setError('An error occurred while saving admin data');
    }
    setLoading(false);
  };

  return (
    <div className="admin-page">
      <h2>{isEdit ? 'Edit Admin' : 'Create Admin'}</h2>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {!isEdit ? (
            <>
              <div>
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Prenom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>User ID</label>
                <input
                  type="text"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label>User ID</label>
                <input
                  type="text"
                  name="new_user_id"
                  value={formData.new_user_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <button type="submit">{isEdit ? 'Sauvgarder' : 'Créer'}</button>
        </form>
      )}
    </div>
  );
};

export default AdminPage;
