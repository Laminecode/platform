import React, { useEffect, useState } from 'react';
import * as utils from '../../js/utils';
import { useNavigate } from 'react-router-dom';
import Choix from '../../Component/Choix';

function T_ListDeChoix({user}) {
  const navigate = useNavigate();
  const [choix, setChoix] = useState([]);
  const [able, setAble] = useState('');
  const [limit_choix, setLimit_choix] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await utils.sendRequest('etudiant/get_liste_de_choix/', {}, navigate);
      setChoix(response.res);
      const response2 = await utils.sendRequest('etudiant/can_modify_liste_de_choix/', {id:user.id}, navigate);
        setAble(response2.able)
        setLimit_choix(response2.less_than_limit)
    };
    fetchData();
  }, [navigate]);

  const handleRemoveFromChoix = async (id) => {
    try {
      await utils.sendRequest('etudiant/delete_liste_de_choix/', { id }, navigate);
      setChoix(choix.filter(projet => projet.sujet.id !== id));
    } catch (error) {
      console.error("Error removing from choix", error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = async(e, newIndex) => {
    console.log("drop",newIndex);
    const oldIndex = parseInt(e.dataTransfer.getData("index"));
    const newChoix = [...choix];
    const [removed] = newChoix.splice(oldIndex, 1);
    newChoix.splice(newIndex, 0, removed);
    
    setChoix(newChoix);
    //new_order:[id,id,id,....,id]
    const new_order = newChoix.map((projet) => projet.sujet.id);
    await utils.sendRequest('etudiant/reorder_liste_de_choix/',{new_order},navigate)
    const response = await utils.sendRequest('etudiant/get_liste_de_choix/', {}, navigate);
    setChoix(response.res);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="list_de_choix_container">
      <h1 className="page-title">Liste de choix</h1>
      <p className="page-description">
        Vous pouvez consulter la liste des choix que vous avez faits et les modifier si vous le souhaitez.<br/>
        L'order des projet est important ! <br/>
        {!limit_choix && able  && <span>Vous avez atteint la limite de choix autorisée.</span>}
      </p>
      <div className='list_de_choix' onDragOver={handleDragOver}>
        {choix.map((projet, index) => (
          <div 
            key={projet.sujet.id} 
            draggable 
            onDragStart={(e) => handleDragStart(e, index)} 
            onDrop={(e) => handleDrop(e, index)} 
            className="drag-item"
          >
            <Choix projet={projet} onRemoveFromChoix={handleRemoveFromChoix} able={able} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default T_ListDeChoix;
