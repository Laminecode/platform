import React, { useState } from 'react';

function EncadreurExt() {
    const [formData, setFormData] = useState({
        username: '',
        user_id: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
    <div>
        <h2>Encadreur Externe</h2>
        <form>
            <div>
                <label >username</label>
                <input type='text' id='name' required/>
            </div>
            <div>
                <label >user_id</label>
                <input type='email' id='email' required/>
            </div>
            <div>
                <label >Mot de passe</label>
                <input type='password' id='password' required/>
            </div>
            <button type='submit'>Create</button>
        </form>
    </div>
    );
}

export default EncadreurExt;