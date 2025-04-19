import React from 'react'

function T_About({user}) {
 console.log(user)
 return (
  <>
    {!user ? (
      <div>Loading...</div>
    ) : (
      <div className='E_About'>
        <div className="E_contenu">
          <h2>Informations du profil</h2>
          <div className='A_container'>
            <div className="E_left">
              <div className='contact '>
                <h4>Palier :</h4>
                <span>{user.palier}</span>
              </div>
              <div className='contact email'>
                <h4>Matricucle :</h4>
                <span>{user.user_id}</span>
              </div>
              <div className='contact '>
                <h4>Spécialité :</h4>
                <span>{user.specialite}</span>
              </div>
              <div className='contact '>
                <h4>Année :</h4>
                <span>{user.annee}</span>
              </div>
            </div>
            <div className='E_right'>
              <div className='expertise'>
                <h4>Préférences : </h4>
                <div className='list'>
                  {user.preferences.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}
                </div>
              </div>
              <div className='outils'>
                <h4>Compétences : </h4>
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

export default T_About