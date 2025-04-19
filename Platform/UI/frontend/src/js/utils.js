import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export function store_session_info(session)
{
    localStorage.setItem('session', JSON.stringify(session));
}
export function store_type(type){
    localStorage.setItem('type', JSON.stringify(type));
}
export function get_type(){
    const typeString = localStorage.getItem('type');
    return typeString ? JSON.parse(typeString) : null;
}
export function get_session_info(){
    const sessionString = localStorage.getItem('session');
    return sessionString ? JSON.parse(sessionString) : null;
}

export function create_json(payload) {
    const session = get_session_info();
    console.log(session);
    return {
        "payload": payload,
        "session": session
    };
}
export const remove_session_info = () => {
    localStorage.removeItem('session');
    localStorage.removeItem('type');
}

export const fetchData = async () => {
  try {
      const session = create_json();
      const response = await axios.post('http://localhost:8000/platform/encadreur/get_profil/', session);
      console.log(response.data);
      return response.data.payload;
  } catch (error) {
      console.log('Error fetching user data:', error);
  }
};

export const sendRequest = async (url,data,navigate)=>{
    // const navigate = useNavigate()
    try {
        const session = create_json(data)
        console.log(session)
        const response = await axios.post(`http://localhost:8000/platform/${url}`, session);
        if (response.data.status === 0){
            return response.data.payload
        }else if(response.data.status === 2){
            return response
            console.log('Error fetching user data:', response);
        }else if (response.data.status === 1){
            navigate('/logout')
            remove_session_info()
        }
    } catch (error) {
        navigate('/logout')
        remove_session_info()
        console.log('Error fetching user data:', error);
    }
}

export const get_select_options = async() => {
    try {
        const response = await axios.get('http://localhost:8000/platform/encadreur/get_select_options/');
        return response.data.payload;
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
}