import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as utils from '../../js/utils';
import Domain from '../../Component/Domain';
import Outils from '../../Component/Outils';
import UserComponentEnc from '../../Component/UserComponentEnc';
import { useNavigate } from 'react-router-dom';

function T_encadreur() {
  const [dropDomain, setDropDomain] = useState(false);
  const [dropOutils, setDropOutils] = useState(false);
  const [filter, setFilter] = useState({ username: '', domaines: [], outils: [] });
  const [encadreur, setEncadreur] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await utils.sendRequest('etudiant/rechercher_encadreur/', filter, navigate);
      setEncadreur(response.res);
      const suggestionsResponse = await utils.sendRequest('etudiant/suggerer_encadreur/', {}, navigate);
      setSuggestions(suggestionsResponse.res);
    };
    fetchData();
  }, [filter]);

  const handleAddToFavorites = async (user_id) => {
    const response = await utils.sendRequest('etudiant/add_encadreur_favoris/', { user_id: user_id }, navigate);
      setEncadreur(encadreur.map(enc => 
        enc.encadreur.user_id === user_id ? { ...enc, encadreur: { ...enc.encadreur, is_favoris: true } } : enc
      ));
      setSuggestions(suggestions.map(suggestion => 
        suggestion.encadreur.user_id === user_id ? { ...suggestion, encadreur: { ...suggestion.encadreur, is_favoris: true } } : suggestion
      ));
    
  };

  const removeFavorite = async (user_id) => {
    const response = await utils.sendRequest('etudiant/delete_encadreur_favoris/', { user_id: user_id }, navigate);
      setEncadreur(encadreur.map(enc => 
        enc.encadreur.user_id === user_id ? { ...enc, encadreur: { ...enc.encadreur, is_favoris: false } } : enc
      ));
      setSuggestions(suggestions.map(suggestion => 
        suggestion.encadreur.user_id === user_id ? { ...suggestion, encadreur: { ...suggestion.encadreur, is_favoris: false } } : suggestion
      ));
  };

  return (
    <div className='T_encadreur'>
      <div className='filter_search'>
        <input
          type="search"
          name='username'
          placeholder='Trouver un encadreur...'
          onChange={(event) => { setFilter({ ...filter, username: event.target.value }) }}
        />
        <button className='btn_filter_menu' onClick={() => { setDropDomain(!dropDomain) }}>
          Domain <ArrowDropDownIcon className='drop_icon' />
        </button>
        <button className='btn_filter_menu' onClick={() => { setDropOutils(!dropOutils) }}>
          Compétence <ArrowDropDownIcon className='drop_icon' />
        </button>
        <Domain setFilter={setFilter} dropDomain={dropDomain} />
        <Outils setFilter={setFilter} dropOutils={dropOutils} />
      </div>
      <hr />
      {filter.username || filter.domaines.length > 0 || filter.outils.length > 0 ? (
        encadreur && encadreur.length > 0 ? (
          encadreur.map((enc, key) => (
            <UserComponentEnc
              key={key}
              item={enc.encadreur}
              isFavoris={enc.encadreur.is_favoris}
              onclick={() => handleAddToFavorites(enc.encadreur.user_id)}
              onremove={() => removeFavorite(enc.encadreur.user_id)}
            />
          ))
        ) : (
          <div className="no-encadreur-message">No encadreurs found.<hr /></div>
        )
      ) : (
        suggestions && suggestions.length > 0 ? (
          suggestions.map((suggestion, key) => (
            <UserComponentEnc
              key={key}
              item={suggestion.encadreur}
              isFavoris={suggestion.encadreur.is_favoris}
              onclick={() => handleAddToFavorites(suggestion.encadreur.user_id)}
              onremove={() => removeFavorite(suggestion.encadreur.user_id)}
            />
          ))
        ) : (
          <div className="no-encadreur-message">No suggestions available.<hr /></div>
        )
      )}
    </div>
  );
}

export default T_encadreur;
