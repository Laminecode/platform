

function E_About({ user, setuser }) {
  console.log(user);

  return (
    <>
      {!user ? ( 
        <div>Loading...</div>
      ) : (
        <div className='E_About'>
          <div className='E_contenu'>
            <h2>Informations du profil</h2>
            <div className='A_container'>
              <div className="E_left">
                <div className='contact'>
                  {user.type === 'interne' ? 
                  (<>
                      <h4>Grade :</h4>
                      <span>{user.grade}</span>
                  </>):(<>
                      <h4>Société :</h4>
                      <span>{user.societe}</span>
                  </>)}
                  
                </div>
                <div className='contact email'>
                  <h4>Email :</h4>
                  <span>{user.user_id}</span>
                </div>
                <div className='contact'>
                  {user.type === 'interne' ? (
                    <>
                    <h4>specialite :</h4>
                    <span>{user.specialite}</span>
                  </>
                ):(
                  <>
                    <h4>Poste :</h4>
                    <span>{user.poste}</span>
                  </>)

                  }
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
                    {user.expertises.map((exp, index) => (
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
            <hr />
            <div className='contact long'>
                  <h4>nombre de binôme maximum :</h4>
                  <span>{user.nombre_binome_max}</span>
              </div>
              <div className='contact moyen'>
                  <span>{user.moyen_contact}</span>
              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default E_About;
