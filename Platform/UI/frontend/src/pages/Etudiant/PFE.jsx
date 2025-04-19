import {useState,useEffect} from 'react'
import {useNavigate,NavLink} from 'react-router-dom'
import * as utils from '../../js/utils.js'


function PFE() {
    const [pfe,setPfe] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const response = await utils.sendRequest('etudiant/get_pfe/', {}, navigate)
            setPfe(response)
        }
        fetchData()
    }, [])
  return (
    pfe.has_pfe ? (
    <div className='Prjet_details'>
      <div className='pfe_container details' >
            <div className='details_titre'>
                <h1>{pfe.pfe.sujet.titre}</h1>
            </div>
            <div className='details_type'>
                <span>{pfe.pfe.sujet.type}</span>
            </div>
            <div className='more_details'>
                <span>Domaines :</span>
                <div className='list'>
                  {pfe.pfe.sujet.domaines.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}
                </div>
            </div>
            <div className='more_details'>
                <span>Compétences :</span>
                <div className='list'>
                  {pfe.pfe.sujet.outils.map((exp, index) => (
                    <div className="exp" key={index}>{exp}</div>
                  ))}   
                </div>
            </div>
            <div className='more_details details_desc'>
                <span>Description :</span>
                <p>{pfe.pfe.sujet.desc}</p>
            </div>
            <div className='more_details details_encadreur'>
                <div className='details_img'>
                    <img src="../images/user.png" alt="" />
                </div>
                <span><NavLink to={`/E/${pfe.pfe.encadreur.user_id}/Profile`} >{pfe.pfe.encadreur.username}</NavLink></span>
            </div>
      </div >
    </div>
    ) : <div>
            <h1>Vous n'avez pas encore de PFE</h1>
        </div>
  )
}

export default PFE