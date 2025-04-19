import React, { useEffect, useState } from 'react'
import * as utils from '../js/utils'
import { useNavigate } from 'react-router-dom'


function NotificationMenu({open3,notifications,setnotifications,user}) {
  const navigate = useNavigate()
  const [reload , setreload] = useState(true)
  useEffect(()=>{
    const fetchData = async()=>{
      const type = utils.get_type()
      if (type == "etudiant"){
        console.log(type)
        const getnotification = await utils.sendRequest('etudiant/get_notifications/',{},navigate)
        setnotifications(getnotification.res)  
      }else if(type == "encadreur"){
        const getnotification = await utils.sendRequest('encadreur/get_notifications/',{},navigate)  
        setnotifications(getnotification.res)
        console.log(getnotification)
      }
      
    }
    fetchData()
  },[reload])

  const setEtat = async(id,type) =>{
    if(type == 'projet-attribue'){
      navigate(`/${user.user_id}/PFE`)
    }
    setreload(!reload)
    await utils.sendRequest('set_notification_lu/',{id},navigate)
  }
 

  return (
    <div className={`notification_menu2 ${open3 ? 'open3' : ''}`}>
      <h3>Notifications</h3>
      <div className="notifications_element">
        {notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className='notification_item' onClick={()=>{setEtat(notification.id,notification.type)}}>
                <div className='notification_date'>{new Date(notification.date).toLocaleString()}</div>
                {notification.type === 'projet-attribue' && (<div className='notification_message'>Un projet vous a été attribué</div>)}
                {notification.type == 'delai' && (<div className='notification_message'>{notification.message} : {notification.delai}</div>)}
                {notification.type == 'general' && (<div className='notification_message'>{notification.message}</div>)}
              </div>
            ))
          ) : (
            <p>Aucune notification</p>
          )}
      </div>
    </div>  
  )
}

export default NotificationMenu