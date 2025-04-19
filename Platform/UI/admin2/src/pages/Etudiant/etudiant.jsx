import { useEffect, useState } from 'react';
import { UserComponent } from '../../Component/UserComponentEtu';
import { FaPlus } from 'react-icons/fa';
import Confirm from '../../Component/confirm';
import { useNavigate } from 'react-router-dom';
import * as utils from '../../js/utils';

const Etudiant = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [etudiants, setEtudiants] = useState([]);
  const [matricule, setMatricule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (matricule !== '') {
          response = await utils.sendRequest('rechercher_etudiant/', { matricule }, navigate);
        } else {
          response = await utils.sendRequest('get_etudiants/', {}, navigate);
        }
        setEtudiants(response.res || []);
      } catch (err) {
        setError('An error occurred while fetching students');
      }
      setLoading(false);
    };
    fetchData();
  }, [matricule, navigate]);

  return (
    <div>
      <Confirm confirm={confirm} setConfirm={setConfirm} />
      <div className='search'>
        <input
          type="search"
          placeholder='Rechercher...'
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
        />
      </div>
      <h2>Etudiants</h2>
      <hr />
      {loading ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>
      ) : etudiants.length === 0 ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Aucun étudiant trouvé</h2>
      ) : (
        <div className='list'>
          {etudiants.map((etu, index) => (
            <UserComponent key={index} etu={etu} setConfirm={setConfirm} />
          ))}
        </div>
      )}
      <button className='btn_create' onClick={() => navigate('/New_Groupe')}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Etudiant;
