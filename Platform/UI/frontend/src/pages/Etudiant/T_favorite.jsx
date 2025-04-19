import React, { useEffect, useState } from 'react';
import * as utils from '../../js/utils';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavLink } from 'react-router-dom';
import UserComponentEnc from '../../Component/UserComponentEnc';

function T_favorite() {
  const [sujets, setSujets] = useState([]);
  const [encadreurs, setEncadreurs] = useState([]);
  const [type, setType] = useState('sujet');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (type === 'sujet') {
          const response = await utils.sendRequest('etudiant/get_sujet_favoris/', {}, navigate);
          setSujets(response.res);
        } else {
          const response = await utils.sendRequest('etudiant/get_encadreur_favoris/', {}, navigate);
          setEncadreurs(response.res);
        }
      } catch (error) {
        console.error('Error fetching favorites', error);
      }
    };
    fetchFavorites();
  }, [type, navigate]);

  const handleRemoveFavoriteSujet = async (id) => {
    try {
      await utils.sendRequest('etudiant/delete_sujet_favoris/', { id }, navigate);
      setSujets((prevSujets) => prevSujets.filter((sujet) => sujet.sujet.id !== id));
    } catch (error) {
      console.error('Error removing favorite sujet', error);
    }
  };

  const handleRemoveFavoriteEncadreur = async (id) => {
    try {
      await utils.sendRequest('etudiant/delete_encadreur_favoris/', { user_id: id }, navigate);
      setEncadreurs((prevEncadreurs) => prevEncadreurs.filter((enc) => enc.encadreur.user_id !== id));
    } catch (error) {
      console.error('Error removing favorite encadreur', error);
    }
  };

  return (
    <div className='T_favorite'>
      <div className='T_favorite_header'>
        <h1>FAVORIS</h1>
      </div>
      <div className='favorit_type'>
        <span className={type==='sujet'?'favorit':''} onClick={() => setType('sujet')}>Sujets</span>
        <span className={type==='encadreur'?'favorit':''} onClick={() => setType('encadreur')}>Encadreurs</span>
      </div>
      <hr />
      <div className='T_favorite_contenu'>
        <div>
          {type === 'sujet' ? (
            sujets.map((sujet) => (
              <div className='sujet' key={sujet.sujet.id}>
                <div className='s_info'>
                  <div className='pris_s_info'>
                    <NavLink to={`/${sujet.sujet.id}/${sujet.sujet.titre}`} className='sujet_titre'>{sujet.sujet.titre}</NavLink>
                    <div className='sujet_type'>{sujet.sujet.type}</div>
                  </div>
                  <div>{sujet.encadreur.username}</div>
                  <div className='add-to-favorites'>
                    <FavoriteIcon onClick={() => handleRemoveFavoriteSujet(sujet.sujet.id)} style={{ color: 'red' }} />
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            encadreurs.map((encadreur) => (
              <UserComponentEnc
                key={encadreur.encadreur.user_id}
                item={encadreur.encadreur}
                isFavoris={true}
                onclick={() => {}}
                onremove={() => handleRemoveFavoriteEncadreur(encadreur.encadreur.user_id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default T_favorite;
