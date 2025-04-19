import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, message } from 'antd';
import * as utils from '../js/utils'

const Setting = () => {
    const navigate = useNavigate();
    const [param1Date, setParam1Date] = useState('');
    const [param2Date, setParam2Date] = useState('');
    const [loading ,setLoading] = useState(false)
    const [param1Active, setParam1Active] = useState(false);
    const [param2Active, setParam2Active] = useState(false);
    const [choix, setChoix] = useState(0);
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    useEffect(() => {
        const fetchData = async () =>{
            const session =  await utils.sendRequest('get_attribution_automatique/',{}, navigate)
            const semmision = await utils.sendRequest('get_soumission_sujet/',{},navigate)
            const getchoix = await utils.sendRequest('get_nombre_choix_max/',{},navigate)
            console.log(choix)
            setChoix(getchoix.nombre_choix_max)
            setParam1Date(session.date)
            setParam2Date(semmision.date)
            setParam1Active(session.active)
            setParam2Active(semmision.active)
            console.log(semmision,session)
        }
        fetchData()
    },[])

    const today = new Date().toISOString().slice(0, 16); // Get today's date and time in YYYY-MM-DDTHH:MM format

    const handleParam1DateChange = (event) => {
        setParam1Date(event.target.value);
        setError1('');
    };

    const handleParam2DateChange = (event) => {
        setParam2Date(event.target.value);
        setError2('');
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };

    const validateAndLancerAffectation = async() => {
        if (!param1Date) {
            message.error('Veuillez sélectionner une date et une heure');
            return;
        }
        if (new Date(param1Date) < new Date(today)) {
            message.error('La date ne peut pas être dans le passé');
            return;
        }
        const formattedDate = formatDateTime(param1Date);
        const data = { date: formattedDate, active: param1Active };
        console.log('Data for Lancer Affectation:', data);
        // sendToBackend('/api/lancer-affectation', data);
        setLoading(true)
        await utils.sendRequest('set_attribution_automatique/',data,navigate)
        setLoading(false)
    };

    const validateAndAffectation = async() => {
        if (!param2Date) {
            message.error('Veuillez sélectionner une date et une heure');
            return;
        }
        if (new Date(param2Date) < new Date(today)) {
            message.error('La date ne peut pas être dans le passé');
            return;
        }
        const formattedDate = formatDateTime(param2Date);
        const data = { date: formattedDate, active: param2Active };
        console.log('Data for Affectation:', data);
        // sendToBackend('/api/affectation', data);
        setLoading(true)
        await utils.sendRequest('set_soumission_sujet/',data,navigate)
        setLoading(false)
        
    };

    const LancerAffectation = async () =>{
        setLoading(true)
        const response = utils.sendRequest('launch_attribution_automatique/',{},navigate)
        setLoading(false)
    }
    const handleChoix = async () =>{
        if(choix === 0){
            message.error('Veuillez saisir un nombre')
            return
        }
        setLoading(true)
        const response = utils.sendRequest('set_nombre_choix_max/',{nombre_choix_max :choix},navigate)
        setLoading(false)
    }
    if(loading) return (
    <div className='loading'>
        <h4>loading...</h4>
    </div>
)

    return (
        <div className='setting-container'>
            <div className='setting-heading'>
                <h1>Paramètres</h1>
            </div>
            <div className='setting'>
                <div className='setting-row'>
                    <span>Attribution automatique :</span>
                    <div className='setting-info'>
                        <p>active :</p>
                        <Switch checked={param1Active} onChange={setParam1Active} />
                        <input
                            type="datetime-local"
                            value={param1Date}
                            onChange={handleParam1DateChange}
                            min={today}
                        />
                    </div>
                </div>
                <div className='Setting_button_container'>
                    <button className='Lancer' onClick={LancerAffectation}>Lancer</button>
                    <button className='set' onClick={validateAndLancerAffectation}>Sauvgarder</button>
                </div>
            </div>
            <div className='setting'>
                <div className='setting-row'>
                    <span>Nombre maximum de choix de projet par binôme :</span>
                    <input type="number" className='choix-input' value={choix} onChange={(e)=>{setChoix(e.target.value)}} />
                </div>
                <button className='set' onClick={handleChoix}>Sauvgarder</button>
            </div>
            <div className='setting'>
                <div className='setting-row'>
                    <span>Soumission Projet :</span>
                    <div className='setting-info'>
                        <p>active :</p>
                        <Switch checked={param2Active} onChange={setParam2Active} />
                        <input
                            type="datetime-local"
                            value={param2Date}
                            onChange={handleParam2DateChange}
                            min={today}
                        />
                    </div>
                </div>
                <button className='set' onClick={validateAndAffectation}>Sauvgarder</button>
            </div>
            <div className='setting'>
                <div className='setting-row'>
                    <span>Domaines et Compétences et Spécialités :</span>
                    <button className='set' onClick={() => navigate('/FillLists')}>Modifier</button>
                </div>
            </div>
        </div> 
    );
};

export default Setting;