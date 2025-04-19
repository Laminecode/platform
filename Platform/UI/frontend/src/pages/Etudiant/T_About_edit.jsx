import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTimes, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from 'antd';
import * as utils from '../../js/utils';

function T_About_edit({ user, setuser }) {
  const [editedInfo, setEditedInfo] = useState({ ...user });
  const [newPreference, setNewPreference] = useState('');
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

  const handleAddPreference = () => {
    if (newPreference.trim() !== '' && !editedInfo.preferences.includes(newPreference)) {
      setEditedInfo({
        ...editedInfo,
        preferences: [...editedInfo.preferences, newPreference]
      });
      setNewPreference('');
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

  const handleRemovePreference = (index) => {
    const updatedPreferences = editedInfo.preferences.filter((_, i) => i !== index);
    setEditedInfo({ ...editedInfo, preferences: updatedPreferences });
  };

  const handleRemoveOutil = (index) => {
    const updatedOutils = editedInfo.outils.filter((_, i) => i !== index);
    setEditedInfo({ ...editedInfo, outils: updatedOutils });
  };

  const handleSave = async () => {
    try {
      console.log('editedInfo : ', editedInfo);
      const response = await utils.sendRequest('etudiant/set_profil/', editedInfo, navigate);
      navigate(`/${editedInfo.user_id}/profile`);
      const result = await utils.sendRequest('etudiant/get_profil/', {}, navigate);
      const groupedResponse = {
        user_id: result.etudiant.user_id,
        username: result.etudiant.username,
        outils: result.etudiant.outils,
        preferences: result.etudiant.preferences,
        active: result.groupe.active,
        annee: result.groupe.annee,
        specialite: result.groupe.specialite,
        palier: result.groupe.palier,
      };
      console.log(groupedResponse);
      setuser(groupedResponse);
    } catch (e) {
      console.log(e);
    }
  };

  const availablePreferences = Domaines.filter(domaine => !editedInfo.preferences.includes(domaine));
  const availableOutils = Competences.filter(competence => !editedInfo.outils.includes(competence));

  return (
    <div className='Edit_About'>
      <div className="E_contenu">
        <h2>Modifier Profile</h2>
        <div className='edit_container'>
          <div className='E_left '>
            <div className='edit_expertise '>
              <h4>Préférences :</h4>
              <div className='edit_exp_list'>
                <div className='list_add'>
                  <select value={newPreference} onChange={(e) => setNewPreference(e.target.value)}>
                    <option value="">Sélectionnez une préférence</option>
                    {availablePreferences.map((preference, index) => (
                      <option key={index} value={preference}>{preference}</option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddPreference} />
                </div>
              </div>
            </div>
            <div className='list'>
              {editedInfo.preferences.map((preference, index) => (
                <div className='exp' key={index}>
                  {preference}
                  <FontAwesomeIcon icon={faTimes} onClick={() => handleRemovePreference(index)} style={{ cursor: 'pointer', marginLeft: '3px' }} />
                </div>
              ))}
            </div>
          </div>
          <div className='E_right edit_right'>
            <div className='edit_div '>
              <h4>Compétences :</h4>
              <div className='Edit_out_list '>
                <div className='list_add'>
                  <select value={newOutil} onChange={(e) => setNewOutil(e.target.value)}>
                    <option value="">Sélectionnez une compétence</option>
                    {availableOutils.map((outil, index) => (
                      <option key={index} value={outil}>{outil}</option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddOutil} />
                </div>
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
        <hr />
        <div className='contact'>
          <h5>Actif :</h5>
          <Switch className="custom-switch" checked={editedInfo.concerned} onChange={(checked) => setEditedInfo({ ...editedInfo, concerned: checked })} />
        </div>
        <span>En désactivant ce paramètre, vous ne serez plus concerné par l'attribution automatique. </span>
        <button className='save_edit' onClick={handleSave}>Sauvegarder</button>
      </div>
    </div>
  );
}

export default T_About_edit;
