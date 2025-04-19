import React, { useEffect, useState } from 'react';
import * as utils from '../../js/utils'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate,NavLink, useParams } from 'react-router-dom';


function E_sujets() {
  const [sujet, setSujet] = useState({}); 
  const navigate = useNavigate();
  const {user_id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const response = await utils.sendRequest('etudiant/get_suejets_de_encadreur/', {user_id},navigate);
      console.log(response.res);
      setSujet(response.res);
    };
    fetchData();
  }, [user_id]);


  const handleAddToFavorites = async (id) => {
    try {
      await utils.sendRequest('etudiant/add_sujet_favoris/', { id }, navigate);
      setSujet(sujet.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_favoris: true } } : sujet
      ));
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await utils.sendRequest('etudiant/delete_sujet_favoris/', { id }, navigate);
      setSujet(sujet.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_favoris: false } } : sujet
      ));
    } catch (error) {
      console.error("Error removing from favorites", error);
    }
  };


  return (
    <div className='E_sujet'>
      <hr />
      {sujet.length > 0 ? (
        sujet.map((sujet, k) => (
          <div className='sujet' key={k}>
             <div className='s_info'>
                    <div className='pris_s_info'>
                        <NavLink to ={`/${sujet.sujet.id}/${sujet.sujet.titre}`} className='sujet_titre' >{sujet.sujet.titre}</NavLink>
                        <div className='sujet_type'>{sujet.sujet.type}</div>
                    </div>
                    <div className='sujet_palier'>{sujet.sujet.palier}</div>
                    {sujet.sujet.is_favoris ? (
                      <FavoriteIcon onClick={() => handleRemoveFavorite(sujet.sujet.id)} style={{ color: 'red' }} />
                    ) : (
                      <FavoriteIcon onClick={() => handleAddToFavorites(sujet.sujet.id)} />
                    )}
              </div>
            <hr />
          </div>
        ))
      ) : (
        <div className='sujet'>
          <div className='sujet_title'>Acunes projets</div>
        </div>
      )}
    </div>
  );
}

export default E_sujets;
