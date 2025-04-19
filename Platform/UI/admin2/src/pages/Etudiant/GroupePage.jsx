import React, { useEffect, useState } from 'react';
import { Switch, message, Modal } from 'antd';
import { useNavigate, useParams,NavLink } from 'react-router-dom';
import * as utils from '../../js/utils.js';
import { UserComponent2 } from '../../Component/UserComponentEtu';
import AssignProject from '../../Component/AssignProject';

function GroupePage() {
  const { user_id } = useParams();
  const [pfe, setPfe] = useState({}); 
  const [groupe, setGroupe] = useState({
    groupe: {
      palier: '',
      specialite: '',
      annee: 0,
      active: true,
    },
    etudiants: []
  });
  const [showAssignProject, setShowAssignProject] = useState(false);
  const [specialites, setSpecialites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await utils.sendRequest('get_groupe/', { matricule: user_id }, navigate);
      setGroupe({
        groupe: response.groupe.groupe,
        etudiants: response.etudiants
      });

      if (response.groupe.groupe.id) {
        const getPfe = await utils.sendRequest('get_pfe_de_groupe/', { id: response.groupe.groupe.id }, navigate);
        setPfe(getPfe);
      }
    };
    fetchData();
  }, [user_id, navigate, showAssignProject]);

  useEffect(() => {
    const fetchSpecialites = async () => {
      if (groupe.groupe.palier) {
        const response = await utils.sendRequest('get_specialites_de_palier/', { palier: groupe.groupe.palier }, navigate);
        setSpecialites(response.res);
      }
    };
    fetchSpecialites();
  }, [groupe.groupe.palier, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupe((prevData) => ({
      ...prevData,
      groupe: {
        ...prevData.groupe,
        [name]: value
      }
    }));
  };

  const handleSwitchChange = (checked) => {
    setGroupe((prevData) => ({
      ...prevData,
      groupe: {
        ...prevData.groupe,
        active: checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      matricule: user_id,
      ...groupe.groupe
    };
    const response = await utils.sendRequest_with_navigate('set_groupe/', dataToSend, navigate, '/etudiant');
    console.log(response);
  };

  const handleDelete = async () => {
    const response = await utils.sendRequest_with_navigate('delete_groupe/', { id: groupe.groupe.id }, navigate, '/etudiant');
    console.log(response);
  };

  const handleAssignClick = (e) => {
    e.preventDefault();
    if (pfe.has_pfe) {
      message.error('Vous ne pouvez pas affecter un projet à un groupe qui a déjà un PFE');
    } else {
      setShowAssignProject(true);
    }
  };

  const handleRemovePfe = async () => {
    try {
      const response = await utils.sendRequest('remove_pfe_from_groupe/', { id: groupe.groupe.id }, navigate);

      if (groupe.groupe.id) {
        const getPfe = await utils.sendRequest('get_pfe_de_groupe/', { id: groupe.groupe.id }, navigate);
        setPfe(getPfe);
      }
    } catch (error) {
      console.error('Error removing PFE:', error);
    }
  };

  const showRemovePfeConfirm = () => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir supprimer ce PFE ?',
      content: 'Cette action est irréversible',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: handleRemovePfe,
    });
  };

  const showDeleteGroupeConfirm = () => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir supprimer ce groupe ?',
      content: 'Cette action est irréversible',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: handleDelete,
    });
  };

  const handleAssignClose = () => {
    setShowAssignProject(false);
  };

  return (
    <div className='new_Grp'>
      <div className='titre'>
        <h1>Binôme</h1>
        <hr />
      </div>
      <h2>Informations Général</h2>
      <div className='grp_form'>
        <form onSubmit={handleSubmit}>
          <div className='general'>
            <div className='grp_info'>
              <span>Palier :</span>
              <select name='palier' value={groupe.groupe.palier} onChange={handleChange} required>
                <option value='' disabled>Palier</option>
                <option value='L3'>L3</option>
                <option value='M2'>M2</option>
              </select>
            </div>
            <div className='grp_info'>
              <span>Specialité :</span>
              <select name='specialite' value={groupe.groupe.specialite} onChange={handleChange} required>
                <option value='' disabled>Sélectionner specialité</option>
                {specialites.map((specialite) => (
                  <option key={specialite.id} value={specialite.nom}>
                    {specialite.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className='grp_info'>
              <span>Année :</span>
              <input type='number' name='annee' value={groupe.groupe.annee} onChange={handleChange} required/>
            </div>
          </div>
          <div>
            <div className='active_aff'>
              <h5>Actif</h5>
              <Switch className="custom-switch" checked={groupe.groupe.active} onChange={handleSwitchChange} />
              <span>En désactivant ce paramètre, ce groupe ne sera pas concerné par l'attribution automatique.</span>
            </div>
          </div>
          <button type='button' className='delete_grp' onClick={showDeleteGroupeConfirm}>Supprimer</button>
          <button type='submit' className='save'>sauvegarder</button>
          <button type='button' className='assign-project-button' onClick={(e)=>handleAssignClick(e)}>Attribuer projet</button>
        </form>
      </div>
      <hr />
      <h2>Binôme</h2>
      <div className='list'>
        {groupe.etudiants.map((etu, index) => (
          <UserComponent2 key={index} etu={etu} groupe={groupe.groupe} />
        ))}
      </div>
      <hr />
      {pfe.has_pfe && 
        <div className='Pfe_componente'>
          <h2>PFE</h2>
          <div className='pfe_info'>
            <span>Titre :</span>
            <span><NavLink to={`/${pfe.pfe.sujet.id}/${pfe.pfe.sujet.titre}`}>{pfe.pfe.sujet.titre}</NavLink></span>
          </div>
          <div className='pfe_info'>
            <span>Encadreur :</span>
            <span><NavLink to={`/${pfe.pfe.encadreur.user_id}/EditEnc`}>{pfe.pfe.encadreur.username}</NavLink></span>
          </div>
          <div className='pfe_info'>
            <span>Type : </span>
            <span>{pfe.pfe.sujet.type}</span>
          </div>
          <button type='button' className='remove-pfe-button' onClick={showRemovePfeConfirm}>Supprimer le PFE</button>
        </div>
      }
      {showAssignProject && <AssignProject groupeId={groupe.groupe.id} onClose={handleAssignClose} />}
    </div>
  );
}

export default GroupePage;
