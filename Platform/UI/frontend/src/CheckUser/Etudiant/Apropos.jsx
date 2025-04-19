import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import * as utils from '../../js/utils';
import { useNavigate } from 'react-router-dom';

function A_propos() {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [groupe, setGroupe] = useState(null);
    useEffect(() => { 
      const fetchData = async () => {
        const response = await utils.sendRequest('encadreur/get_etudiant/', {matricule:user_id}, navigate);
        console.log(response);
        setUser(response.etudiant);
        setGroupe(response.groupe)
      };
      fetchData();
    }, []);
    console.log('dskfjasjefalsdjfka',user)
 return (
  <>
    {!user ? (
      <div>Loading...</div>
    ) : (
      <div className='E_About'>
        <div className="E_contenu">
          <h2>USER INFORMATION</h2>
          <div className='A_container'>
            <div className="E_left">
              <div className='contact '>
                <h4>Palier :</h4>
                <span>{groupe.palier}</span>
              </div>
              <div className='contact email'>
                <h4>Matricucle :</h4>
                <span>{user.user_id}</span>
              </div>
              <div className='contact '>
                <h4>Specialite :</h4>
                <span>{groupe.specialite}</span>
              </div>
              <div className='contact '>
                <h4>Annee :</h4>
                <span>{groupe.annee}</span>
              </div>
            </div>
            <div className='E_right'>
              <div className='expertise'>
                <h4>Preferences : </h4>
                <div className='list'>
                  {user.preferences.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}
                </div>
              </div>
              <div className='outils'>
                <h4>Compétence : </h4>
                <div className='list'>
                  {user.outils.map((outil, index) => (
                    <div className="exp" key={index}>{outil}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
}

export default A_propos;