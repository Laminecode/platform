import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'; 
import UserComponentEnc from '../../Component/UserComponentEnc';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as utils from '../../js/utils';

function Encadreur() {
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState('');
  const [email, setEmail] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [encadreurs, setEncadreurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEncadreurs = async () => {
      setLoading(true);
      try {
        let response;
        if (email !== '') {
          response = await utils.sendRequest('rechercher_encadreur/', { email: email }, navigate);
        } else {
          response = await utils.sendRequest('get_encadreurs/', {}, navigate);
        }
        setEncadreurs(response.res || []);
      } catch (err) {
        console.error('An error occurred while fetching encadreurs', err);
      }
      setLoading(false);
    };
    fetchEncadreurs();
  }, [email, navigate]);

  const handleDelete = async () => {
    try {
      await utils.sendRequest('delete_encadreur/', { email: idDelete }, navigate);
      setEncadreurs(encadreurs.filter(encadreur => encadreur.encadreur.user_id !== idDelete));
    } catch (err) {
      console.error('An error occurred while deleting the encadreur', err);
    }
    setConfirmVisible(false);
    setIdDelete('');
  };

  const showConfirm = (id) => {
    setIdDelete(id);
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
    setIdDelete('');
  };

  return (
    <div>
      <Modal
        title="Confirmation"
        visible={confirmVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Oui"
        cancelText="Non"
      >
        <p style={{color:'black'}}>Êtes-vous sûr de vouloir supprimer cet encadreur ? Cette action est irréversible.</p>
      </Modal>
      <div className='search'>
        <input
          type="search"
          placeholder='Rechercher...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <h2>Encadreurs</h2>
      <hr />
      {loading ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>
      ) : encadreurs.length === 0 ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Aucun Encadreur</h2>
      ) : (
        <div className='list'>
          {encadreurs.map((item, key) => (
            <UserComponentEnc
              key={key}
              item={item.encadreur}
              onclick={() => showConfirm(item.encadreur.user_id)}
            />
          ))}
        </div>
      )}
      <button className='btn_create' onClick={() => navigate('/New_Encadreur')}>
        <FaPlus />
      </button>
    </div>
  );
}

export default Encadreur;
