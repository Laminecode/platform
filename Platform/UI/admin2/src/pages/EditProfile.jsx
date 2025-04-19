import React, { useContext,useState,useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import * as utils from '../js/utils'
import { message } from 'antd';
import {useNavigate} from 'react-router-dom'

function EditProfile() {
    const {user} = useContext(AuthContext);
    const [profil , setProfile]  = useState()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        setProfile(user)
        console.log(user)
        console.log(profil)
    },[user])

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
        if (!emailRegex.test(email)) {
          console.log('email', email);
          message.error('Veuillez entrer une adresse email valide.');
          return false;
        }
        return true;
      };
  
    const handleChange = (e) => {
        setProfile({
          ...profil,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(profil.user_id)) return;
        setLoading(true);
        await utils.sendRequest('set_profil/',profil,navigate)
        setLoading(false);
        navigate('/')
      };

      if(!profil || loading) {
        return (<div>loading...</div>)
      }
  return (
    <div className='admin-page  profil-form'>
        <h1>Modifier le profil</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>User ID</label>
                <input
                    type="text"
                    name="user_id"
                    value={profil.user_id}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={profil.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={profil.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sauvgarder</button>
        </form>
    </div>
  )
}

export default EditProfile