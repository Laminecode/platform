import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTimes, faPlusSquare } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as utils from '../../js/utils';
import { Switch } from 'antd';

function E_About_edit({ user, setuser }) {
  const [editedInfo, setEditedInfo] = useState({ ...user });
  const [newExpertise, setNewExpertise] = useState('');
  const [newOutil, setNewOutil] = useState('');
  const [Domaines, setDomaines] = useState([]);
  const [Competences, setCompetences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchlist = async () => {
      try {
        const domainesResponse = await utils.sendRequest('encadreur/get_domaines/', {}, navigate);
        const competencesResponse = await utils.sendRequest('encadreur/get_competences/', {}, navigate);
        setDomaines(domainesResponse.res.map(domain => domain.nom));
        setCompetences(competencesResponse.res.map(competence => competence.nom));
      } catch (error) {
        console.error('Error fetching list:', error);
      }
    };
    fetchlist();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim() !== '' && !editedInfo.expertises.includes(newExpertise)) {
      setEditedInfo({
        ...editedInfo,
        expertises: [...editedInfo.expertises, newExpertise]
      });
      setNewExpertise('');
    }
  };

  const handleAddOutil = () => {
    if (newOutil.trim() !== '' && !editedInfo.outils.includes(newOutil)) {
      setEditedInfo({
        ...editedInfo,
        outils: [...editedInfo.outils, newOutil]
      });
      setNewOutil('');
    }
  };

  const handleRemoveExpertise = (index) => {
    const updatedExpertises = editedInfo.expertises.filter((_, i) => i !== index);
    setEditedInfo({ ...editedInfo, expertises: updatedExpertises });
  };

  const handleRemoveOutil = (index) => {
    const updatedOutils = editedInfo.outils.filter((_, i) => i !== index);
    setEditedInfo({ ...editedInfo, outils: updatedOutils });
  };

  const handleSave = async () => {
    try {
      console.log('editedInfo : ', editedInfo)
      await utils.sendRequest('encadreur/set_profil/', editedInfo, navigate);
      navigate('/user/profile');
      const result = await utils.sendRequest('encadreur/get_profil/', {}, navigate);
      setuser(result.encadreur);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSwitchChange = (checked) => {
    setEditedInfo({ ...editedInfo, visible: checked });
  };

  const availableExpertises = Domaines.filter(domaine => !editedInfo.expertises.includes(domaine));
  const availableOutils = Competences.filter(competence => !editedInfo.outils.includes(competence));

  return (
    <div className='Edit_About'>
      <div className='E_contenu'>
        <h2>Modifier Profile</h2>
        <div className='edit_container'>
          <div className='E_left'> 
            <div className='edit_div'>
              <h4>Number of Binomes :</h4>
              <input type="number" name="nombre_binome_max" value={editedInfo.nombre_binome_max || ''} onChange={handleChange} />
            </div> 
            <div className='edit_div'>
              <h4>Expertises : </h4>
              <div className='edit_exp_list'>
                <div className='list_add'>
                  <select value={newExpertise} onClick={handleAddExpertise} onChange={(e) => setNewExpertise(e.target.value)}>
                    <option value="">Sélectionnez une expertise</option>
                    {availableExpertises.map((expertise, index) => (
                      <option key={index} value={expertise}>{expertise}</option>
                    ))}
                  </select>
                  {/* <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddExpertise} /> */}
                </div>
              </div>
              <div className='list'>
                {editedInfo.expertises.map((expertise, index) => (
                  <div className='exp' key={index}>
                    {expertise}
                    <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveExpertise(index)} style={{ cursor: 'pointer', marginLeft: '3px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='E_right edit_right'>
            <div className='edit_div'>
              <h4>Bureau :</h4>
              <input type="text" name="bureau" value={editedInfo.bureau || ''} onChange={handleChange} />
            </div>
            <div className='edit_div'>
              <h4>Compétence :</h4>
              <div className='Edit_out_list'>
                <div className='list_add'>
                  <select value={newOutil} onClick={handleAddOutil} onChange={(e) => setNewOutil(e.target.value)}>
                    <option value="">Sélectionnez une compétence</option>
                    {availableOutils.map((outil, index) => (
                      <option key={index} value={outil}>{outil}</option>
                    ))}
                  </select>
                  {/* <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddOutil} /> */}
                </div>
              </div>
              <div className='list'>
                {editedInfo.outils.map((outil, index) => (
                  <div className='exp' key={index}>
                    {outil}
                    <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveOutil(index)} style={{ cursor: 'pointer', marginLeft: '3px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='edit_moyen'>
          <h4>Moyen de Contact :</h4>
          <textarea type="text" name="moyen_contact" value={editedInfo.moyen_contact || ''} onChange={handleChange} />
        </div>
        <hr />
        <div className='Visible'>
          <span>Visible</span>
          <Switch className='custom-switch' checked={editedInfo.visible} onChange={handleSwitchChange} />
        </div>
        <button className='save_edit' onClick={handleSave}>Sauvegarder</button>
      </div>
    </div>
  );
}

export default E_About_edit;
