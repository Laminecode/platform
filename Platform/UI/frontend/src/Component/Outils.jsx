import React, { useState, useEffect } from 'react';
import * as utils from '../js/utils'
import { useNavigate } from 'react-router-dom';

function Outils({ setFilter, dropOutils }) {
  const [list_of_outils , setList_of_outils] = useState([])
  const navigate = useNavigate()
  const handleOutilsFilter = (value, checked) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      outils: checked ? [...prevFilter.outils, value] : prevFilter.outils.filter(item => item !== value)
    }));
  };
  useEffect(()=>{
    const fetchlist = async() =>{
      const competencesResponse = await utils.sendRequest('encadreur/get_competences/', {}, navigate);
      setList_of_outils(competencesResponse.res.map(outils => outils.nom));
    }
    fetchlist()
  },[])

 

  return (
    <div className={`drop_filter drop_O ${dropOutils ? 'open_filter' : ''}`}>
      {list_of_outils.length === 0 && <div>Loading...</div>}
      {list_of_outils.map(outil => (
        <label key={outil}>
            <div className='filter_value'>
                <input 
                    type="checkbox" 
                    value={outil} 
                    onChange={e => handleOutilsFilter(e.target.value, e.target.checked)}
                />
                {outil}
            </div>
          <hr />
        </label>
      ))}
    </div>
  );
}

export default Outils;