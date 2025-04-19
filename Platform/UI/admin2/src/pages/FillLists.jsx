import React, { useState, useEffect } from 'react';
import { Switch, Input, Button, message, Select } from 'antd';
import * as utils from '../js/utils.js';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function FillLists() {
  const navigate = useNavigate();
  const [domaines, setDomaines] = useState([]);
  const [outils, setOutils] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [newDomaine, setNewDomaine] = useState('');
  const [newOutil, setNewOutil] = useState('');
  const [newSpecialite, setNewSpecialite] = useState({ nom: '', palier: 'L3' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const domainesResponse = await utils.get_Domains();
        setDomaines(domainesResponse.res || []);
        
        const outilsResponse = await utils.get_Outils();
        setOutils(outilsResponse.res || []);
        
        const specialitesResponse = await utils.get_Specialites();
        setSpecialites(specialitesResponse.res || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleAddDomaine = async () => {
    if (newDomaine) {
      if (domaines.some(d => d.nom.toLowerCase() === newDomaine.toLowerCase())) {
        message.error('Ce domaine existe déjà');
        return;
      }
      const newDomain = { nom: newDomaine, active: true };
      setDomaines([...domaines, newDomain]);
      setNewDomaine('');
      await utils.sendRequest('add_domaine/', { nom: newDomain.nom }, navigate);
    }
  };

  const handleAddOutil = async () => {
    if (newOutil) {
      if (outils.some(o => o.nom.toLowerCase() === newOutil.toLowerCase())) {
        message.error('Cet outil existe déjà');
        return;
      }
      const newTool = { nom: newOutil, active: true };
      setOutils([...outils, newTool]);
      setNewOutil('');
      await utils.sendRequest('add_competence/', { nom: newTool.nom }, navigate);
    }
  };

  const handleAddSpecialite = async () => {
    if (newSpecialite.nom && newSpecialite.palier) {
      if (specialites.some(s => s.nom.toLowerCase() === newSpecialite.nom.toLowerCase())) {
        message.error('Cette spécialité existe déjà');
        return;
      }
      const newSpecialty = { ...newSpecialite, active: true };
      setSpecialites([...specialites, newSpecialty]);
      setNewSpecialite({ nom: '', palier: '' });
      await utils.sendRequest('add_specialite/', { nom: newSpecialty.nom, palier: newSpecialty.palier }, navigate);
    }
  };
  
  const handleUpdate = async (type, index, newNom = null, newPalier = null) => {
    let items, setItems, endpoint;
    switch (type) {
      case 'domaine':
        items = [...domaines];
        setItems = setDomaines;
        endpoint = 'set_domaine/';
        break;
      case 'outil':
        items = [...outils];
        setItems = setOutils;
        endpoint = 'set_competence/';
        break;
      case 'specialite':
        items = [...specialites];
        setItems = setSpecialites;
        endpoint = 'set_specialite/';
        break;
      default:
        return;
    }

    const oldNom = items[index].nom;
    const etat = items[index].active;

    if (newNom !== null) {
      items[index].nom = newNom;
    } else if (newPalier !== null) {
      items[index].palier = newPalier;
    } else {
      items[index].active = !items[index].active;
    }

    setItems(items);
    await utils.sendRequest(endpoint, { nom: oldNom, active: items[index].active, new_nom: items[index].nom, palier: items[index].palier }, navigate);
  };

  return (
    <div className='FillLists'>
      <div className='FillLists_main'>
        <div className='Domaines_list'>
          <div>
            <h2>Domaines</h2>
          </div>
          <div className='FillLists_create'>
            <Input 
              value={newDomaine} 
              onChange={(e) => setNewDomaine(e.target.value)} 
              placeholder="Add new domain"
            />
            <Button onClick={handleAddDomaine}>Ajouter</Button>
          </div>
          <div className='Domaines'>
            {domaines.map((domaine, index) => (
              <div key={index} className="list-item">
                <Input 
                  value={domaine.nom} 
                  onChange={(e) => handleUpdate('domaine', index, e.target.value)} 
                />
                <Switch 
                  checked={domaine.active} 
                  onChange={() => handleUpdate('domaine', index)} 
                />
              </div>
            ))}
          </div>
        </div>
        <div className='Outils_list'>
          <div>
            <h2>Compétences</h2>
          </div>
          <div className='FillLists_create'>
            <Input 
              value={newOutil} 
              onChange={(e) => setNewOutil(e.target.value)} 
              placeholder="Add new tool"
            />
            <Button onClick={handleAddOutil}>Ajouter</Button>
          </div>
          <div className='Outils'>
            {outils.map((outil, index) => (
              <div key={index} className="list-item">
                <Input 
                  value={outil.nom} 
                  onChange={(e) => handleUpdate('outil', index, e.target.value)} 
                />
                <Switch 
                  checked={outil.active} 
                  onChange={() => handleUpdate('outil', index)} 
                />
              </div>
            ))}
          </div>
        </div>
        <div className='Specialites_list'>
          <div>
            <h2>Specialites</h2>
          </div>
          <div className='FillLists_create'>
            <Input 
              value={newSpecialite.nom} 
              onChange={(e) => setNewSpecialite({ ...newSpecialite, nom: e.target.value })} 
              placeholder="Add new specialty"
            />
            <Select
              className="custom-select"
              value={newSpecialite.palier}
              onChange={(value) => setNewSpecialite({ ...newSpecialite, palier: value })}
              placeholder="Level (e.g., L3, M2)"
              defaultValue="L3"
            >
              <Option value="L3" >L3</Option>
              <Option value="M2">M2</Option>
            </Select>
            <Button onClick={handleAddSpecialite}>Ajouter</Button>
          </div>
          <div className='Specialite'>
            {specialites.map((specialite, index) => (
              <div key={index} className="list-item">
                <Input 
                  value={specialite.nom} 
                  onChange={(e) => handleUpdate('specialite', index, e.target.value, null)} 
                />
                <Select
                  className="custom-select"
                  value={specialite.palier}
                  onChange={(value) => handleUpdate('specialite', index, null, value)}
                  placeholder="Level"
                >
                  <Option value="L3">L3</Option>
                  <Option value="M2">M2</Option>
                </Select>
                <Switch 
                  checked={specialite.active} 
                  onChange={() => handleUpdate('specialite', index)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillLists;
