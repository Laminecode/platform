import React, { useEffect, useState } from 'react';
import * as utils from '../../js/utils';
import { useNavigate, NavLink } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'; // Importing EditIcon from Material-UI
import IconButton from '@material-ui/core/IconButton';
import { message, Modal} from 'antd'; // Importing Modal and Input from antd

function E_sujet() {
  const [sujets, setSujets] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [titre, setTitre] = useState(''); 
  const [able, setAble] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (titre !== '') {
        const response = await utils.sendRequest('encadreur/rechercher_sujet/', { titre }, navigate);
        setSujets(response.res);
      } else {
        const response = await utils.sendRequest('encadreur/get_sujets/', {}, navigate);
        setSujets(response.res);
      }
      const getAbility = await utils.sendRequest('is_phase_soumission_sujet/', {}, navigate);
      setAble(getAbility.bool);
    };
    fetchData();
  }, [navigate, titre]);

  const handleDeleteSujet = async () => {
    const response = await utils.sendRequest('encadreur/supprimer_sujet/', { id: idToDelete }, navigate);
    if (response.success == false) {
      message.error(`${response.erreur}`);
      setConfirmVisible(false);
      return 
    }
    setConfirmVisible(false);
    const result = await utils.sendRequest('encadreur/get_sujets/', {}, navigate);
    setSujets(result.res);
  };

  const showConfirm = async (id) => {
    setIdToDelete(id);
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
    setIdToDelete('');
  };

  return (
    <div className='E_sujet'>
      <Modal
        title="Confirmation"
        visible={confirmVisible}
        onOk={handleDeleteSujet}
        onCancel={handleCancel}
        okText="Oui"
        cancelText="Non"
      >
        <p style={{color:'black'}}>Êtes-vous sûr de vouloir supprimer ce sujet ? Cette action est irréversible.</p>
      </Modal>
      <div className='filter_search'>
        <input
          type="search"
          name='titre'
          placeholder='Rechercher...'
          onChange={(e) => setTitre(e.target.value)}
        />
        {able ? 
        <button
          className='new'
          onClick={() => { navigate(`/Create`);}}
        >
          Publier
        </button>:
        <></>
        }
      </div>
      <hr />
      {sujets.length > 0 ? (
        sujets.map((sujet, k) => (
          <div className='sujet' key={k}>
            <div className='s_info'>
              <div className='pris_s_info'>
                <NavLink to={`/E/${sujet.sujet.id}/${sujet.sujet.titre}`} className='sujet_titre'>
                  {sujet.sujet.titre}
                </NavLink>
                <div className='sujet_type'>{sujet.sujet.type}</div>
              </div>
              <div className='sujet_palier'>{sujet.sujet.palier}</div>
              <div className='action-icons'>
                {able && 
                  <>
                    <IconButton onClick={() => showConfirm(sujet.sujet.id)} className='delete-icon'>
                      <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/create/${sujet.sujet.id}`)} className='edit-icon'>
                      <EditIcon style={{ color: 'white' }} />
                    </IconButton>
                  </>
                }
              </div>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div className='sujet'>
          <div className='sujet_title'>No Subjects created</div>
        </div>
      )}
    </div>
  );
}

export default E_sujet;
