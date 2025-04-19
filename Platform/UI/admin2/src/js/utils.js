import axios from 'axios';


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
export function get_session_info() {
    try {
      const sessionString = localStorage.getItem('session');
      return sessionString ? JSON.parse(sessionString) : null;
    } catch (error) {
    //   console.error('Error parsing session info from localStorage:', error);
      return null;
    }
  }

export function create_json(payload) {
    const session = get_session_info();
    return {
        "payload": payload,
        "session": session
    };
}
export function clear_session_info(){
    localStorage.removeItem('session');
}


export const sendRequest = async (url,data,navigate)=>{
    try {
        const session = create_json(data)
        console.log(session)
        const response = await axios.post(`http://localhost:8000/platform/admin/${url}`, session);
        console.log(response);
        if (response.data.status === 0){
            return response.data.payload
        }else{
            // navigate('/login');
        }
    } catch (error) {
        clear_session_info()
        navigate('/login')
        console.log('Error fetching user data:', error);
    }
}

export const sendRequest_with_navigate = async (url,data,navigate,path)=>{
    try {
        const session = create_json(data)
        console.log(session)
        const response = await axios.post(`http://localhost:8000/platform/admin/${url}`, session);
        if (response.data.status === 0 || url === 'logout/'){
            if (url === 'logout/'){
                clear_session_info()
            }
            navigate(`${path}`)
            return response.data.payload
        }else{
            navigate('/login');
        }
    } catch (error) {
        clear_session_info()
        // navigate('/login')
        console.log('Error fetching user data:', error);
    }
}


export const get_Domains = async () => {
    try{
        const sesssion = create_json({})
        const response = await axios.post('http://localhost:8000/platform/admin/get_domaines/',sesssion);
        if (response.data.status === 0){
            return response.data.payload
        }
    }catch(error)  {
        console.log('Error fetching user data:', error);
    } 
}
export const get_Outils = async () => { 
    try{
        const session =create_json({})
        const response = await axios.post('http://localhost:8000/platform/admin/get_competences/',session);
        if (response.data.status === 0){
            return response.data.payload
        }
    }catch(error)  {
        console.log('Error fetching user data:', error);
    } 
}
export const get_Specialites = async (palier) => {
    try{
        const session = create_json(palier)  
        const response = await axios.post('http://localhost:8000/platform/admin/get_specialites/',session);
        if (response.data.status === 0){
            return response.data.payload
        }
    }catch(error)  {
        console.log('Error fetching user data:', error);
    } 
}

export const validateEmail = (email) => {
    const emailRegexes = [
      /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}$/,
      /^[A-Za-z]*\.[A-Za-z]*@usthb\.edu\.dz$/
    ];
    
    for (const regex of emailRegexes) {
      if (regex.test(email)) {
        return true;
      }
    }
    return false;
}