import  {useState } from 'react'
import  {EtudiantForm2} from '../../Component/EtudiantForm'
import { useParams } from 'react-router-dom';


function EditEtudiant() {
    const { user_id } = useParams();
    const [matricule ,setMatricule] = useState('')
    const [etudiant , setEtudiant] = useState({})
    
  return (
    <div className='EditEtudaint'>
        <EtudiantForm2 matricule={user_id}/>
    </div>
  )
}

export default EditEtudiant