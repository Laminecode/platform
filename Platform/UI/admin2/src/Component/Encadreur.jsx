import React, { useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as utils from '../js/utils';

function EncadreurForm() {
  const navigate = useNavigate();
  const [switchChecked, setSwitchChecked] = useState(true); // Initialized to true
  const [type, setType] = useState('interne');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    specialite: '',
    grade: '',
    societe: '',
    poste: '',
    password: '',
  });

  const handleSwitchChange = (checked) => {
    setSwitchChecked(checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { nom, prenom, email, specialite, grade, societe, poste, password } = formData;
    if (!nom || !prenom || !email || !password || (type === 'interne' && (!specialite || !grade)) || (type === 'externe' && (!societe || !poste))) {
      message.error('Veuillez remplir tous les champs.');
      return false;
    }
    if (!utils.validateEmail(formData.email)) {
      message.error('Veuillez entrer une adresse email valide.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const dataToSend = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      type,
      visible: switchChecked, // Include the visible attribute
      ...(type === 'interne'
        ? { specialite: formData.specialite, grade: formData.grade }
        : { societe: formData.societe, poste: formData.poste })
    };
    console.log('dataToSend:', dataToSend);
    const response = await utils.sendRequest_with_navigate('creer_encadreur/', dataToSend, navigate, '/encadreur');
    console.log('response', response);
  };

  return (
    <div className='create-container'>
      <h2><FaUserTie /> Encadreur - {type}</h2>
      <div className='type_encadreur'>
        <span className={type === 'interne' ? 'indexed' : ''} onClick={() => setType('interne')}>Interne</span>
        <span className={type === 'externe' ? 'indexed' : ''} onClick={() => setType('externe')}>Externe</span>
      </div>
      <div className='form'>
        <div className='left'>
          <div>
            <span>Nom :</span>
            <input type='text' name='nom' value={formData.nom} onChange={handleInputChange} />
          </div>
          <div>
            <span>Prenom :</span>
            <input type='text' name='prenom' value={formData.prenom} onChange={handleInputChange} />
          </div>
          <div>
            <span>Email :</span>
            <input type='email' name='email' value={formData.email} onChange={handleInputChange} />
          </div>
        </div>
        <div className='right'>
          {type === 'interne' ? (
            <>
              <div>
                <span>Spécialité :</span>
                <input type='text' name='specialite' value={formData.specialite} onChange={handleInputChange} />
              </div>
              <div>
                <span>Grade :</span>
                <input type='text' name='grade' value={formData.grade} onChange={handleInputChange} />
              </div>
            </>
          ) : (
            <>
              <div>
                <span>Société :</span>
                <input type='text' name='societe' value={formData.societe} onChange={handleInputChange} />
              </div>
              <div>
                <span>Poste :</span>
                <input type='text' name='poste' value={formData.poste} onChange={handleInputChange} />
              </div>
            </>
          )}
          <div>
            <span>Mot de passe :</span>
            <input type='password'  name='password' value={formData.password} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <hr />
      <div className='visble'>
        <span>Visibile :</span>
        <Switch
          className="custom-switch"
          checked={switchChecked}
          onChange={handleSwitchChange}
          onColor="#1677ff"
          offColor="gray"
        />
      </div>
      <button className='save' onClick={handleSubmit}>Save</button>
    </div>
  );
}



function EncadreurForm2(email) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('user_id', email);
      const response = await utils.sendRequest('get_encadreur/', email, navigate);
      setFormData({
        ...response.encadreur,
        email: response.encadreur.user_id,
      });
      setLoading(false);
    };

    fetchData();
  }, [email, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const validateEmail = (email) => {
  //   if (!email.match('[A-Za-z]*\.[A-Za-z]*@usthb.edu.dz')) {
  //     message.error('Veuillez entrer une adresse email valide.');
  //     return false;
  //   }
  // };

  const validateForm = () => {
    const requiredFields = ['username', 'email', 'password'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        message.error(`Veuillez remplir le champ ${field}.`);
        return false;
      }
    }

    if (!utils.validateEmail(formData.email)) {
      message.error('Veuillez entrer une adresse email valide.');
      return false;
    }

    if (formData.type === 'interne' && (!formData.specialite || !formData.grade)) {
      message.error('Veuillez remplir les champs spécialité et grade.');
      return false;
    }

    if (formData.type === 'externe' && (!formData.societe || !formData.poste)) {
      message.error('Veuillez remplir les champs société et poste.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await utils.sendRequest_with_navigate('set_encadreur/', formData, navigate, '/encadreur');
  };

  if (loading) {
    return (
      <div className='loading'>
        <h4>loading...</h4>
      </div>
    );
  }

  return (
    <div className='create-container'>
      <h2><FaUserTie /> {formData.username}-{formData.type} </h2>
      <div className='form'>
        <div className='left'>
          <div>
            <span>Username :</span>
            <input type='text' name='username' value={formData.username} onChange={handleInputChange} />
          </div>
          <div>
            <span>Email :</span>
            <input type='email' name='email' value={formData.email} onChange={handleInputChange} />
          </div>
          <div>
            <span>Mot de passe :</span>
            <input type='password' id='password' name='password' value={formData.password} onChange={handleInputChange} />
          </div>
        </div>
        <div className='right'>
          {formData.type === 'interne' ? (
            <>
              <div>
                <span>specialite :</span>
                <input type='text' name='specialite' value={formData.specialite} onChange={handleInputChange} />
              </div>
              <div>
                <span>Grade : </span>
                <input type='text' name='grade' value={formData.grade} onChange={handleInputChange} />
              </div>
            </>
          ) : (
            <>
              <div>
                <span>societe :</span>
                <input type='text' name='societe' value={formData.societe} onChange={handleInputChange} />
              </div>
              <div>
                <span>Poste : </span>
                <input type='text' name='poste' value={formData.poste} onChange={handleInputChange} />
              </div>
            </>
          )}
          <div className='visbleEdit'>
            <span>Visible :</span>
            <Switch
              className="custom-switch"
              checked={formData.visible}
              onChange={() => setFormData((prevData) => ({ ...prevData, visible: !formData.visible }))}
              style={{ backgroundColor: formData.visible ? '#1677ff' : 'gray' }}
            />
          </div>
        </div>
      </div>
      <button className='save' onClick={handleSubmit}>Save</button>
      <hr />
      <div className='Plus_enc_info'>
        <span>Bureau : {formData.bureau}</span>
        <span>Nombre de binome maximum : {formData.nombre_binome_max} </span>
        {/* <span style={{ color: 'gray' }}>{formData.moyen_contact}</span> */}
        <div className='contact long'>
          <h4>Moyen de contact :</h4>
          {formData.moyen_contact &&  
          <span>
             {formData.moyen_contact.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </span>
          }
        </div>
      </div>
    </div>
  );
}
export { EncadreurForm, EncadreurForm2};
