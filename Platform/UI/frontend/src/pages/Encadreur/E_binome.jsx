import { useState, useEffect } from 'react'
import Binome from '../../Component/Binome'
import * as utils from '../../js/utils'
import { useNavigate } from 'react-router-dom'

function E_binome() {
  const [binomes, setBinomes] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const response = await utils.sendRequest('encadreur/get_groupes/', {}, navigate)
      console.log(response.res)
      setBinomes(response.res)
    }
    fetchData()
  }, [])
  return (
    <>
      <h1>Binômes</h1>
      <hr />
      <div className='list'>
        {binomes.length > 0 ? ( 
          binomes.map((binome, k) => (
            <Binome key={k} binome={binome} />
          ))
        ) : (
          <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Aucun binôme</h2>
        )}
      </div>
    </>
  )
}

export default E_binome