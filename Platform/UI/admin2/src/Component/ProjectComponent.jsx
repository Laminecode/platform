// src/Component/ProjectComponent.js
import React from 'react';
import { useNavigate,NavLink } from 'react-router-dom';

const ProjectComponent = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className='line project'>
      <NavLink to={`/${project.sujet.id}/${project.sujet.titre}`}><h3>{project.sujet.titre}</h3></NavLink>
      <div className='project_more_info'>
        <p>{project.sujet.type}</p>
        <h4>{project.encadreur.username}</h4>
      </div>
    </div>
  );
};

export default ProjectComponent;
