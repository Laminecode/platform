import React, { useState , useEffect} from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import * as utils from '../js/utils';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function EtudiantForm({ etudiant, index, handleEtudiantChange,deleteCard}) {
    return (
        <div className='create-container-etu'>
            <h2><FaUserGraduate /> Etudiant {index +1}</h2>
            <div className='form'>
                <div className='left'>
                    <div>
                        <span>Nom :</span>
                        <input type='text' name='nom' value={etudiant.nom} onChange={(e) => handleEtudiantChange(index, e)} />
                    </div>
                    <div>
                        <span>Prenom :</span>
                        <input type='text' name='prenom' value={etudiant.prenom} onChange={(e) => handleEtudiantChange(index, e)} />
                    </div>
                </div>
                <div className='right'>
                    <div>
                        <span>Matricule :</span>
                        <input type='email' name='matricule' value={etudiant.matricule} onChange={(e) => handleEtudiantChange(index, e)} />
                    </div>
                    <div>
                        <span>Mot de passe :</span>
                        <input type='password' name='password' value={etudiant.password} onChange={(e) => handleEtudiantChange(index, e)} />
                    </div>
                </div>
                <button className='cancel' onClick={()=>deleteCard(index)}>Annuler</button>
            </div>
        </div>
    );
}

function EtudiantForm2({matricule}) {
    const [etudiant,setEtudiant] = useState({})
    const navigate = useNavigate()
    useEffect(() =>{
        const fetchData = async()=>{
        const response  = await utils.sendRequest('get_etudiant/', {matricule},navigate)
        console.log(response)
        setEtudiant({
            user_id: response.etudiant.user_id,
            username: response.etudiant.username,
            matricule: response.etudiant.user_id,
            password: response.etudiant.password
        })
        }
        fetchData()
    },[])
    const handleEtudiantChange = (e) => {
        setEtudiant({ ...etudiant, [e.target.name]: e.target.value });
    };
    const validateMatricule = (matricule) => {
        if (!/^[0-9]{12}$/.test(matricule)) {
          message.error('Le matricule doit comporter exactement 12 chiffres.');
          return false;
        }
        return true;
      };
    const handleSubmit = async(e) => {  
        e.preventDefault()
        if(!validateMatricule(etudiant.matricule)){
            return
        }
        const response = await utils.sendRequest_with_navigate('set_etudiant/',etudiant,navigate,'/etudiant')
        console.log(response)
    }

    return (
        <div className='create-container-etu'>
            <h2><FaUserGraduate /> Etudiant</h2>
            <form className='form' onSubmit={(e)=>handleSubmit(e)}>
                <div className='left'>
                    <div>
                        <span>Username</span>
                        <input type='text' name='username'  value={etudiant.username} onChange={(e)=>handleEtudiantChange(e)}  required/>
                    </div>
                </div>
                <div className='right'>
                    <div>
                        <span>Matricule :</span>
                        <input type='text' name='matricule' value={etudiant.matricule}  onChange={(e)=>handleEtudiantChange(e)} required/>
                    </div>
                    <div>
                        <span>Mot de passe :</span>
                        <input type='password' name='password' value={etudiant.password} onChange={(e)=>handleEtudiantChange(e)} required/>
                    </div>
                </div>
                <button type='submit' className='save' >save</button>
            </form>
        </div>
    );
}
export { EtudiantForm, EtudiantForm2 };
