import React, { useState, useEffect } from 'react';
import { EtudiantForm } from '../../Component/EtudiantForm';
import { Switch, message } from 'antd';
import { FaPlus } from 'react-icons/fa';
import * as utils from '../../js/utils';
import { useNavigate } from 'react-router-dom';

function NewGroupe() {
    const navigate = useNavigate(); 
    const [specialites, setSpecialites] = useState([]);
    const [palier,setpalier] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await utils.sendRequest('get_specialites_de_palier/',{palier:palier},navigate);
            setSpecialites(response.res);
        };
        fetchData();
    }, [palier]);

    const [groupe, setGroupe] = useState({
        etudiants: [
            { nom: '', prenom: '', matricule: '', password: '' },
        ],
        groupe: {
            specialite: "",
            palier: "",
            annee: 0,
            active: true,
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupe((prevData) => ({
            ...prevData,
            groupe: {
                ...prevData.groupe,
                [name]: value
            }
        }));
        if(name === 'palier')
            setpalier(value)
    };

    const handleEtudiantChange = (index, e) => {
        const { name, value } = e.target;
        const newEtudiants = [...groupe.etudiants];
        newEtudiants[index] = { ...newEtudiants[index], [name]: value };
        setGroupe((prevData) => ({ ...prevData, etudiants: newEtudiants }));
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

    const addNewEtudiantCard = () => {
        setGroupe((prevData) => ({
            ...prevData,
            etudiants: [...prevData.etudiants, { nom: '', prenom: '', matricule: '', password: '' }]
        }));
    };

    const deleteEtudiantCard = (index) => {
        setGroupe((prevData) => ({
            ...prevData,
            etudiants: prevData.etudiants.filter((_, i) => i !== index)
        }));
    };

    const validateMatricule = (matricule) => {
        if (!/^[0-9]{12}$/.test(matricule)) {
          message.error('Le matricule doit comporter exactement 12 chiffres.');
          return false;
        }
        return true;
      };

    const validateForm = () => {
        const { specialite, palier, annee } = groupe.groupe;
        if (!specialite || !palier || !annee) {
            message.error('Veuillez remplir toutes les informations du groupe.');
            return false;
        }
        for (let etudiant of groupe.etudiants) {
            if (!etudiant.nom || !etudiant.prenom || !etudiant.matricule || !etudiant.password) {
                message.error('Veuillez remplir toutes les informations des étudiants.');
                return false;
            }
        }
        if (!validateMatricule(groupe.etudiants[0].matricule)) {
            message.error('Veuillez entrer un matricule valide.');
            return false;
        }
        if (groupe.etudiants.length == 2) {
            if(groupe.etudiants[0].matricule === groupe.etudiants[1].matricule){
                message.error('Les matricules des étudiants doivent être différents.');
                return false;
            }
            if (!validateMatricule(groupe.etudiants[1].matricule) ) {
                message.error('Veuillez entrer un matricule valide.');
                return false;
            }
        }
        if(groupe.etudiants.length == 0){
            message.error('Veuillez ajouter au moins un étudiant.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        console.log('groupe ', groupe);
        const response = await utils.sendRequest_with_navigate('creer_groupe/', groupe, navigate, '/etudiant');
        console.log(response);
    };

    return (
        <div className='new_Grp'>
            <div className='titre'>
                <h1>Créer un nouveau binôme</h1>
                <hr />
            </div>
            <h2>Informations Générales</h2>
            <div className='grp_form'>
                <div>
                    <div className='grp_info'>
                        <span>Palier :</span>
                        <select name='palier' onChange={handleChange} value={groupe.groupe.palier}>
                            <option value='' disabled>Sélectionner palier</option>
                            <option value='L3'>L3</option>
                            <option value='M2'>M2</option>
                        </select>
                    </div>
                    <div className='grp_info'>
                        <span>Spécialité :</span>
                        <select name='specialite' onChange={handleChange} value={groupe.groupe.specialite}>
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
                        <input type='number' name='annee' onChange={handleChange} value={groupe.groupe.annee} />
                    </div>
                </div>
                <div>
                    <div className='active_aff'>
                        <h5>Active </h5>
                        <Switch className="custom-switch" checked={groupe.groupe.active} onChange={handleSwitchChange} />
                    </div>
                </div>
            </div>
            <h2>Binôme</h2>
            <hr />
            <div className='etudaint_grp'>
                {groupe.etudiants.map((etudiant, index) => (
                    <EtudiantForm key={index} etudiant={etudiant} index={index} handleEtudiantChange={handleEtudiantChange} deleteCard={deleteEtudiantCard} />
                ))}
                {groupe.etudiants.length < 2 && (
                    <div className='dynamique_number_of_etudiant' onClick={addNewEtudiantCard}>
                        <FaPlus className='add_icon' />
                    </div>
                )}
            </div>
            <hr />
            <button className='save' onClick={handleSubmit}>Save</button>
        </div>
    );
}

export default NewGroupe;
