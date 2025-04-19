import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'; 
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as utils from '../../js/utils';
import UserComponentAdmin from '../../Component/UserAdmin';

function Admin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idDelete, setIdDelete] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await utils.sendRequest('get_admins/', {}, navigate);
        setAdmins(response.res || []);
        console.log(admins)
      } catch (err) {
        console.error('An error occurred while fetching admins', err);
      }
      setLoading(false);
    };
    fetchAdmins();
  }, [navigate]);

  const handleDelete = async () => {
    try {
      await utils.sendRequest('delete_admin/', { user_id: idDelete }, navigate);
      setAdmins(admins.filter(admin => admin.admin.user_id !== idDelete));
    } catch (err) {
      console.error('An error occurred while deleting the admin', err);
    }
    setConfirmVisible(false);
    setIdDelete('');
  };

  const showConfirm = (id) => {
    setIdDelete(id);
    console.log(id)
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
        <p style={{color:'black'}}>Êtes-vous sûr de vouloir supprimer cet admin ? Cette action est irréversible.</p>
      </Modal>
      <h2>Admins</h2>
      <hr />
      {loading ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>
      ) : admins.length === 0 ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>No Admins</h2>
      ) : (
        <div className='list'>
          {admins.map((admin, key) => (
            <UserComponentAdmin
              key={key}
              item={admin}
              onClick={() => showConfirm(admin.admin.user_id)}
            />
          ))}
        </div>
      )}
      <button className='btn_create' onClick={() => navigate('/New_Admin')}>
        <FaPlus />
      </button>
    </div>
  );
}

export default Admin;
