import React, { useEffect,useState } from 'react';
import * as utils from '../js/utils'
import { useNavigate } from 'react-router-dom';

function Domain({ setFilter, dropDomain }) {
  const navigate = useNavigate()
  const [list_of_domains ,setList_of_domains] = useState([])
  const handleDomainFilter = (value, checked) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      domaines: checked ? [...prevFilter.domaines, value] : prevFilter.domaines.filter(item => item !== value)
    }));
  };
  useEffect(()=>{
    const fetchlist = async() =>{
      const domainesResponse = await utils.sendRequest('encadreur/get_domaines/', {}, navigate);
      console.log('lksdjfklsd',domainesResponse.res)
      setList_of_domains(domainesResponse.res.map(domain => domain.nom));
    }
    fetchlist()
  },[])

  

  return (
    <div className={`drop_filter drop_D ${dropDomain ? 'open_filter' : ''} `}>
      {list_of_domains.length === 0 && <div>Loading...</div>}
      {list_of_domains.map(domain => (
        <label key={domain}>
            <div className='filter_value'>
                <input 
                    type="checkbox" 
                    value={domain} 
                    onChange={e => handleDomainFilter(e.target.value, e.target.checked)}
                />
                {domain}
            </div>
          <hr />
        </label>
      ))}
    </div>
  );
}

export default Domain;