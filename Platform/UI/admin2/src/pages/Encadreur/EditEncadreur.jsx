import { useParams } from 'react-router-dom';
import {EncadreurForm2} from '../../Component/Encadreur';

function EditEncadreur() {
    const {user_id} = useParams()
    
  return (
    <div className='EditEncadreur'><EncadreurForm2 email={user_id}/></div>
  )
}

export default EditEncadreur