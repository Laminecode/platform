import React, { useEffect, useState } from 'react'; 
import * as utils from '../../js/utils';
import { useNavigate, useParams } from 'react-router-dom';

function E_Abouts() {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await utils.sendRequest('etudiant/get_encadreur/', { user_id }, navigate);
        setUser(response.encadreur);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [user_id, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='E_About'>
      <div className='E_contenu'>
        <h2>Informations de l'encadruer</h2>
        <div className='A_container'>
          <div className="E_left">
            <div className='contact'>
              {user.type === 'interne' ? (
                <>
                  <h4>Grade :</h4>
                  <span>{user.grade}</span>
                </>
              ) : (
                <>
                  <h4>Société :</h4>
                  <span>{user.societe}</span>
                </>
              )}
            </div>
            <div className='contact'>
              {user.type === 'interne' ? (
                <>
                  <h4>Specialite :</h4>
                  <span>{user.specialite}</span>
                </>
              ) : (
                <>
                  <h4>Poste :</h4>
                  <span>{user.poste}</span>
                </>
              )}
            </div>
            <div className='contact'>
              <h4>Bureau :</h4>
              <span>{user.bureau}</span>
            </div>
          </div>
          <div className='E_right'>
            <div className='expertise'>
              <h4>Expertises : </h4>
              <div className='list'>
                {user.expertises ? (
                  user.expertises.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))
                ) : (
                  <div>No expertises listed</div>
                )}
              </div>
            </div>
            <div className='outils'>
              <h4>Outils : </h4>
              <div className='list'>
                {user.outils ? (
                  user.outils.map((outil, index) => (
                    <div className="exp" key={index}>{outil}</div>
                  ))
                ) : (
                  <div>No tools listed</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='contact long'>
          <h4>Nombre de binôme maximum :</h4>
          <span>{user.nombre_binome_max}</span>
        </div>
        <div className='contact long'>
          <h4>Moyen de contact :</h4>  
          <span>
            {user.moyen_contact.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default E_Abouts;
