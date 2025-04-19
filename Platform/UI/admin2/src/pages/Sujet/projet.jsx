import { useEffect , useState } from 'react'
import * as utils from '../../js/utils'
import { useNavigate, useParams,NavLink } from 'react-router-dom'
import './projet.css'

function Projets() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [projet, setProjet] = useState({})    
    useEffect(() => {
        const fetchData = async() => {
            const response = await utils.sendRequest('get_sujet/', {id}, navigate)
            setProjet(response)
            console.log(response)
        }
        fetchData()
    }, [])
    if (Object.keys(projet).length === 0) {
        return <div>Loading...</div>
    }
  return (
    <div className='Prjet_details'>
      <div className='Projet_details' >
            <div className='details_titre'>
                <h1>{projet.sujet.titre}</h1>
            </div>
            <div className='details_type'>
                <span>{projet.sujet.type}</span>
            </div>
            <div className='more_details'>
              <span>Palier : {projet.sujet.palier}</span>
            </div>
            <div className='more_details'>
                <span>Specialité :</span>
                <div className='exp_list'>
                  {projet.sujet.liste_specialites.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}
                </div>
            </div>
            <div className='more_details'>
                <span>Domaines :</span>
                <div className='exp_list'>
                  {projet.sujet.domaines.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}
                </div>
            </div>
            <div className='more_details'>
                <span>Compétences :</span>
                <div className='exp_list'>
                  {projet.sujet.outils.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}   
                </div>
            </div>
            <div className='more_details details_desc'>
                <span>Description :</span>
                <p>{projet.sujet.desc}</p>
            </div>
            {/* <div className='more_details details_encadreur'>
                <div className='details_img'>
                    <img src="../images/user.png" alt="" />
                </div>
                <span><NavLink to={`/E/${projet.encadreur.user_id}/Profile`} >{projet.encadreur.username}</NavLink></span>
            </div> */}
      </div >
    </div>
  )
}

export default Projets