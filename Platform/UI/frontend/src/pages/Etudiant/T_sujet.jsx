import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as utils from '../../js/utils';
import Domain from '../../Component/Domain';
import Outils from '../../Component/Outils';
import { NavLink, useNavigate } from 'react-router-dom';

function T_sujet({ user }) {
  const [dropDomain, setDropDomain] = useState(false);
  const [dropOutils, setDropOutils] = useState(false);
  const [filter, setFilter] = useState({ titre: '', domaines: [], outils: [], palier: user.palier });
  const [sujets, setSujets] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [able , setAble] = useState('')
  const [limit_choix, setLimit_choix] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await utils.sendRequest('etudiant/rechercher_sujet/', filter, navigate);
        setSujets(response.res);
        const suggestionsResponse = await utils.sendRequest('etudiant/suggerer_sujet/', {}, navigate);
        setSuggestions(suggestionsResponse.res);
        if(user.id != null){
          console.log(user.id)
          const response2 = await utils.sendRequest('etudiant/can_modify_liste_de_choix/', {id:user.id}, navigate);
          setAble(response2.able)
          setLimit_choix(response2.less_than_limit)
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [filter, navigate]);

  const handleAddToFavorites = async (id) => {
    try {
      await utils.sendRequest('etudiant/add_sujet_favoris/', { id }, navigate);
      setSujets(sujets.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_favoris: true } } : sujet
      ));
      setSuggestions(suggestions.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_favoris: true } } : sujet
      ));
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await utils.sendRequest('etudiant/delete_sujet_favoris/', { id }, navigate);
      setSujets(sujets.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_favoris: false } } : sujet
      ));
      setSuggestions(suggestions.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_favoris: false } } : sujet
      ));
    } catch (error) {
      console.error("Error removing from favorites", error);
    }
  };

  const handleAddToChoix = async (id) => {
    try {
      await utils.sendRequest('etudiant/add_liste_de_choix/', { id }, navigate);
      setSujets(sujets.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_choix: true } } : sujet
      ));
      setSuggestions(suggestions.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_choix: true } } : sujet
      ));
      const response2 = await utils.sendRequest('etudiant/can_modify_liste_de_choix/', {id:user.id}, navigate);
        setAble(response2.able)
        setLimit_choix(response2.less_than_limit)
    } catch (error) {
      console.error("Error adding to choix", error);
    }
  };

  const handleRemoveFromChoix = async (id) => {
    try {
      await utils.sendRequest('etudiant/delete_liste_de_choix/', { id }, navigate);
      setSujets(sujets.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_choix: false } } : sujet
      ));
      setSuggestions(suggestions.map(sujet =>
        sujet.sujet.id === id ? { ...sujet, sujet: { ...sujet.sujet, is_choix: false } } : sujet
      ));
      const response2 = await utils.sendRequest('etudiant/can_modify_liste_de_choix/', {id:user.id}, navigate);
        setAble(response2.able)
        setLimit_choix(response2.less_than_limit)
    } catch (error) {
      console.error("Error removing from choix", error);
    }
  };

  return (
    <div className='T_sujet'>
      <div className='filter_search'>
        <input
          type="search"
          name='titre'
          placeholder='Trouver un projet...'
          onChange={(event) => setFilter({ ...filter, titre: event.target.value })}
        />
        <button className='btn_filter_menu' onClick={() => setDropDomain(!dropDomain)}>
          Domain <ArrowDropDownIcon className='drop_icon' />
        </button>
        <button className='btn_filter_menu' onClick={() => setDropOutils(!dropOutils)}>
          Compétence <ArrowDropDownIcon className='drop_icon' />
        </button>
        <Domain setFilter={setFilter} dropDomain={dropDomain} />
        <Outils setFilter={setFilter} dropOutils={dropOutils} />
      </div>
      <hr />
      {filter.domaines.length > 0 || filter.outils.length > 0 || filter.titre ? (
        sujets.length > 0 ? (
          sujets.map((sujet) => (
            <div className='sujet' key={sujet.sujet.id}>
              <div className='s_info'>
                <div className='pris_s_info'>
                  <NavLink to={`/${sujet.sujet.id}/${sujet.sujet.titre}`} className='sujet_titre'>{sujet.sujet.titre}</NavLink>
                  <div className='sujet_type'>{sujet.sujet.type}</div>
                </div>
                <div><NavLink to={`/E/${sujet.encadreur.user_id}/Profile`} >{sujet.encadreur.username}</NavLink></div>
                <div className='actions'>
                  <div className='add-to-favorites'>
                    {sujet.sujet.is_favoris ? (
                      <FavoriteIcon onClick={() => handleRemoveFavorite(sujet.sujet.id)} style={{ color: 'red' }} />
                    ) : (
                      <FavoriteIcon onClick={() => handleAddToFavorites(sujet.sujet.id)} />
                    )}
                  </div>
                  <div className='add-to-choix'>
                    {sujet.sujet.is_choix ? (
                      able === true ? (<CheckCircleIcon onClick={() => handleRemoveFromChoix(sujet.sujet.id)} style={{ color: 'green' }} />):(<></>)

                    ) : (
                      able ===  true && limit_choix == true ? (<AddCircleOutlineIcon onClick={() => handleAddToChoix(sujet.sujet.id)} />):(<></>) 
                      
                    )}
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="no-sujets-message">0 result, No subjects found with this information.<hr /></div>
        )
      ) : (
        suggestions.length > 0 ? (
          suggestions.map((sujet) => (
            <div className='sujet' key={sujet.sujet.id}>
              <div className='s_info'>
                <div className='pris_s_info'>
                  <NavLink to={`/${sujet.sujet.id}/${sujet.sujet.titre}`} className='sujet_titre'>{sujet.sujet.titre}</NavLink>
                  <div className='sujet_type'>{sujet.sujet.type}</div>
                </div>
                <div className='sujet_profile'>
                  <div className='details_img'>
                      <img src="../images/user.png" alt="" />
                  </div>
                  <div><NavLink to={`/E/${sujet.encadreur.user_id}/Profile`} >{sujet.encadreur.username}</NavLink></div>
                  </div>
                <div className='actions'>
                  <div className='add-to-favorites'>
                    {sujet.sujet.is_favoris ? (
                      <FavoriteIcon onClick={() => handleRemoveFavorite(sujet.sujet.id)} style={{ color: 'red' }} />
                    ) : (
                      <FavoriteIcon onClick={() => handleAddToFavorites(sujet.sujet.id)} />
                    )}
                  </div>
                  <div className='add-to-choix'>
                    {sujet.sujet.is_choix ? (
                      able === true ? (<CheckCircleIcon onClick={() => handleRemoveFromChoix(sujet.sujet.id)} style={{ color: 'green' }} />):(<> </>)
                    ) : (
                      able === true  && limit_choix == true ? (<AddCircleOutlineIcon onClick={() => handleAddToChoix(sujet.sujet.id)} />):(<></>)
                    )}
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="no-sujets-message">No suggestions exist for you.<hr /></div>
        )
      )}
    </div>
  );
}

export default T_sujet;
