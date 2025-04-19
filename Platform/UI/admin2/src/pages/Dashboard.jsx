import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaUserTie, FaBook, FaUsers } from 'react-icons/fa';
import CircularGraph from '../Component/Graph';
import * as utils from '../js/utils';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [Statistique, setStatistique] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await utils.sendRequest('get_statistiques/', {}, navigate);
      setStatistique(response);
    };
    fetchData();
  }, [navigate]);

  const graphData = Statistique ? {
    datasets: [
      {
        data: [Statistique.num_active_groups, Statistique.num_inactive_groups],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ],
    details: ["Etudiants concerné par l'attribution automatique", "Etudiants n'est pas concerné par l'attibution automatique"],
    labels: ["Concerné", "Non concerné"]
  } : { datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }], labels: [] };

  const graphData2 = Statistique ? {
    datasets: [
      {
        data: [Statistique.num_groupe_with_pfe, Statistique.num_groupe_without_pfe],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ],
    details: ["Etudiants a un projet", "Etudiants sans projet"],
    labels: ['Avec sujet', 'Sans Projet']
  } : { datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }], labels: [] };

  return (
    Statistique ? (
      <>
        <div>
          <h1>Dashboard</h1>
        </div>
        <div className='dashboard-widgets'>
          <div className='col col-gap'>
              <div className='widget'>
                <div className='widget_general'>
                  <div>
                    <h2>{Statistique.num_students}</h2>
                    <h3>Etudiant</h3>
                  </div>
                  <h1><FaUserGraduate /></h1>
                </div>
              </div>
              <div className='widget'>
                <div className='widget_general'>
                  <div>
                    <h2>{Statistique.num_encadreurs_externe + Statistique.num_encadreurs_interne}</h2>
                    <h3>Encadreur</h3>
                  </div>
                  <h1><FaUserTie /></h1>
                </div>
                <div className='widget_details'>
                  <h4>Interne {Statistique.num_encadreurs_interne}</h4>
                  <h4>Externe {Statistique.num_encadreurs_externe}</h4>
                </div>
              </div>
            </div>
            <div className='col '>
              <div className='widget'>
                <div className='widget_general'>
                  <div>
                    <h2>{Statistique.num_subjects_externe + Statistique.num_subjects_interne}</h2>
                    <h3>Projet</h3>
                  </div>
                  <h1><FaBook /></h1>
                </div>
                <div className='widget_details'>
                  <h4>Interne {Statistique.num_subjects_interne}</h4>
                  <h4>Externe {Statistique.num_subjects_externe}</h4>
                </div>
                <div className='widget_details'>
                  <h4>L3 {Statistique.num_projet_l3}</h4>
                  <h4>M2 {Statistique.num_projet_m2}</h4>
                </div>
              </div>
              <div className='widget'>
                <div className='widget_general'>
                  <div>
                    <h2>{Statistique.num_groups}</h2>
                    <h3>Binôme</h3>
                  </div>
                  <h1><FaUsers /></h1>
                </div>
              </div>
          </div>
        </div>
        <div>
          <h2>Statistiques</h2>
          <hr />
        </div>
        <CircularGraph graphData={graphData} titre={'Attribution automatique'} className='graph' />
        <CircularGraph graphData={graphData2} titre={'PFE Attribuer'} className='graph' />
      </>
    ) : (
      <div className='loading'>
        <h4>loading...</h4>
      </div>
    )
  );
}

export default Dashboard;
