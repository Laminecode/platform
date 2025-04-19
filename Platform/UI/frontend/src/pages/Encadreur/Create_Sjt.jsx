import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faTimes, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, message } from 'antd';
import * as utils from '../../js/utils';

function Create_Sjt({ setuser }) {
  const [sujet, setSujet] = useState({
    titre: "",
    domaines: [],
    outils: [],
    liste_specialites: [],
    desc: "",
    palier: "L3",
    visible: true
  });

  const [newDomaine, setNewDomaine] = useState('');
  const [newOutil, setNewOutil] = useState('');
  const [newSpecialite, setNewSpecialite] = useState('');

  const [listOfDomains, setListOfDomains] = useState([]);
  const [listOfOutils, setListOfOutils] = useState([]);
  const [listOfSpecialities, setListOfSpecialities] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    if (id) {
      const fetchSujet = async () => {
        try {
          const response = await utils.sendRequest(`encadreur/get_sujet/`, { id }, navigate);
          console.log(response);
          if (response && response.sujet) {
            setSujet(response.sujet);
          }
        } catch (error) {
          console.error('Error fetching sujet:', error);
        }
      };
      fetchSujet();
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchlist = async () => {
      try {
        const domainsResponse = await utils.sendRequest('encadreur/get_domaines/', {}, navigate); 
        const outilsResponse = await utils.sendRequest('encadreur/get_competences/', {}, navigate);
        const specialitiesResponse = await utils.sendRequest('encadreur/get_specialites_de_palier/', {palier:sujet.palier}, navigate);
        console.log(domainsResponse, outilsResponse, specialitiesResponse)
        setListOfDomains(domainsResponse.res.map(domain => domain.nom));
        setListOfOutils(outilsResponse.res.map(outil => outil.nom));
        setListOfSpecialities(specialitiesResponse.res.map(speciality => speciality.nom));
      } catch (error) { 
        console.error('Error fetching list:', error);
      }
    };
    fetchlist();
  }, [navigate,sujet.palier]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSujet(prevSujet => ({
      ...prevSujet,
      [name]: value
    }));
  };

  const handleVisibleChange = (checked) => {
    setSujet(prevSujet => ({
      ...prevSujet,
      visible: checked
    }));
  };

  const handleAddDomaine = () => {
    if (newDomaine && !sujet.domaines.includes(newDomaine)) {
      setSujet(prevSujet => ({
        ...prevSujet,
        domaines: [...prevSujet.domaines, newDomaine]
      }));
      setNewDomaine('');
    }
  };

  const handleAddOutil = () => {
    if (newOutil && !sujet.outils.includes(newOutil)) {
      setSujet(prevSujet => ({
        ...prevSujet,
        outils: [...prevSujet.outils, newOutil]
      }));
      setNewOutil('');
    }
  };

  const handleAddSpecialite = () => {
    if (newSpecialite && !sujet.liste_specialites.includes(newSpecialite)) {
      setSujet(prevSujet => ({
        ...prevSujet,
        liste_specialites: [...prevSujet.liste_specialites, newSpecialite]
      }));
      setNewSpecialite('');
    }
  };

  const handleRemoveDomaine = (index) => {
    setSujet(prevSujet => ({
      ...prevSujet,
      domaines: prevSujet.domaines.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveOutil = (index) => {
    setSujet(prevSujet => ({
      ...prevSujet,
      outils: prevSujet.outils.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveSpecialite = (index) => {
    setSujet(prevSujet => ({
      ...prevSujet,
      liste_specialites: prevSujet.liste_specialites.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const { titre, desc, domaines, outils, liste_specialites, palier } = sujet;
    if (!titre || !desc || !palier) {
      message.error('Veuillez remplir toutes les informations obligatoires.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      console.log('sujet : ', sujet);
      if (id) {
        await utils.sendRequest(`encadreur/modify_sujet/`, { ...sujet, id }, navigate);

      } else {
        const response = await utils.sendRequest('encadreur/creer_sujet/', sujet, navigate);
        if (response.success == false){
          message.error('Ce titre de sujet existe déjà, veuillez en choisir un autre.');
          return;
        }
      }
      navigate('/user/Sujet');
    } catch (error) {
      console.error('Error saving sujet:', error);
    }
  };

  const availableDomains = listOfDomains.filter(domain => sujet && !sujet.domaines.includes(domain));
  const availableOutils = listOfOutils.filter(outil => sujet && !sujet.outils.includes(outil));
  const availableSpecialities = listOfSpecialities.filter(specialite => sujet && !sujet.liste_specialites.includes(specialite));

  return (
    <div className='Create_page'>
      <div className='create_menu'>
        <div className='sjt_header'>
          <h4>{id ? "Modifier le Projet" : "Créer un nouveau Projet"}</h4>
          <hr />
        </div>
        <div className='sjt_princip'>
          <div className='sjt_visible'>
            <label htmlFor="visible">Visible :</label>
            <Switch checked={sujet.visible} onChange={handleVisibleChange} />
          </div>
          <div className='sjt_titre'>
            <label htmlFor="titre">Titre <span>(unique)</span>* :</label>
            <input type="text" name="titre" value={sujet.titre} onChange={handleChange} required />
          </div>
        </div>
        <hr />
        <div className='sjt_value'>
          <label htmlFor="palier">Palier <span>(L3-M2)</span> :</label>
          <select name="palier" value={sujet.palier} onChange={handleChange} required>
            <option value="L3">L3</option>
            <option value="M2">M2</option>
          </select>
        </div>
        <div className='sjt_value'>
          <label htmlFor="specialite">Specialites :</label>
          <div className='add_to_list'>
            <select value={newSpecialite} onClick={handleAddSpecialite} onChange={(e) => setNewSpecialite(e.target.value)}>
              <option value="">Sélectionnez une spécialité</option>
              {availableSpecialities.map((specialite, index) => (
                <option key={index} value={specialite}>{specialite}</option>
              ))}
            </select>
            {/* <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddSpecialite} /> */}
          </div>
        </div>
        <div className="sjt_list">
          {sujet.liste_specialites.map((specialite, index) => (
            <div className="exp" key={index}>
              {specialite}
              <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveSpecialite(index)} style={{ cursor: 'pointer', marginLeft: '3px' }} />
            </div>
          ))}
        </div>
        <hr />
        <div className='sjt_value'>
          <label htmlFor="domaines">Domaines :</label>
          <div className='add_to_list'>
            <select value={newDomaine} onClick={handleAddDomaine} onChange={(e) => setNewDomaine(e.target.value)}>
              <option value="">Sélectionnez un domaine</option>
              {availableDomains.map((domain, index) => (
                <option key={index} value={domain}>{domain}</option>
              ))}
            </select>
            {/* <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddDomaine} /> */}
          </div>
        </div>
        <div className="sjt_list">
          {sujet.domaines.map((domaine, index) => (
            <div className="exp" key={index}>
              {domaine}
              <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveDomaine(index)} style={{ cursor: 'pointer', marginLeft: '3px' }} />
            </div>
          ))}
        </div>
        <div className='sjt_value'>
          <label htmlFor="outils">Competances :</label>
          <div className='add_to_list'>
            <select value={newOutil} onClick={handleAddOutil} onChange={(e) => setNewOutil(e.target.value)}>
              <option value="">Sélectionnez une compétence</option>
              {availableOutils.map((outil, index) => (
                <option key={index} value={outil}>{outil}</option>
              ))}
            </select>
            {/* <FontAwesomeIcon icon={faPlusSquare} className='ic_add_list' onClick={handleAddOutil} /> */}
          </div>
        </div>
        <div className="sjt_list">
          {sujet.outils.map((outil, index) => (
            <div className="exp" key={index}>
              {outil}
              <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveOutil(index)} style={{ cursor: 'pointer', marginLeft: '3px' }} />
            </div>
          ))}
        </div>
        <hr />
        <div className='sjt_value'>
          <label htmlFor="desc">Description :</label>
          <textarea name="desc" value={sujet.desc} onChange={handleChange} required></textarea>
        </div>
        <hr />
        <button className='sjt_create' onClick={handleSave}>{id ? "Sauvegarder" : "Créer"}</button>
      </div>
    </div>
  );
}

export default Create_Sjt;
