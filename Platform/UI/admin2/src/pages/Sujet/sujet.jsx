import { useEffect, useState } from 'react';
import ProjectComponent from '../../Component/ProjectComponent';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as utils from '../../js/utils';

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [titre, settitre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (titre !== '') {
          response = await utils.sendRequest('rechercher_sujet/', { titre }, navigate);
        } else {
          response = await utils.sendRequest('get_sujets/', {}, navigate);
            console.log(response)
        }
        setProjects(response.res || []);
      } catch (err) {
        setError('An error occurred while fetching projects');
      }
      setLoading(false);
    };
    fetchData();
  }, [titre, navigate]);

  

  return (
    <div>
      <div className='search'>
        <input
          type="search"
          placeholder='Rechercher...'
          value={titre}
          onChange={(e) => settitre(e.target.value)}
        />
      </div>
      <h2>Projets</h2>
      <hr />
      {loading ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>
      ) : projects.length === 0 ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Aucun projet trouvé</h2>
      ) : (
        <div className='list'>
          {projects.map((project, index) => (
            <ProjectComponent key={index} project={project}  />
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
