import React, { useEffect, useState } from 'react';
import * as utils from '../js/utils.js';
import { useNavigate } from 'react-router-dom';

function AssignProject({ groupeId, onClose }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  console.log('sdjfsfgroupe',groupeId);

  useEffect(() => {
    const fetchProjects = async () => {
      if (searchTerm !== '') {
        const response = await utils.sendRequest('rechercher_sujet_non_attribue/', { titre: searchTerm, id:groupeId }, navigate);
        console.log(response);
        setProjects(response.res);
      } else {
        const response = await utils.sendRequest('get_sujets_non_attribue/', {id:groupeId}, navigate);
        console.log(response);
        setProjects(response.res);
      }
    };
    fetchProjects();
  }, [navigate, searchTerm]);

  const handleAssign = async (projectId) => {
    const response = await utils.sendRequest('set_pfe_to_groupe/', { groupe_id:groupeId, sujet_id:projectId }, navigate);
    console.log(response);
    onClose();
  };

  return (
    <div className="assign-project">
      <h3>Attribuer un projet</h3>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span className="title">{project.sujet.titre}</span>
            <span className="type">{project.sujet.type}</span>
            <span className="palier">{project.sujet.palier}</span>
            <span className="encadreur">{project.encadreur.username}</span>
            <button onClick={() => handleAssign(project.sujet.id)}>Attribuer</button>
          </li>
        ))}
      </ul>
      <button className="close-btn" onClick={onClose}>Fermer</button>
    </div>
  );
}

export default AssignProject;
