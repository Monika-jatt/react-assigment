import React, { useState } from 'react';
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import './AuthComponent.css';


const AuthComponent = () => {
    const navigate = useNavigate();
    const [lusername, setLusername] = useState('');
    const [lemail, setLemail] = useState('');
    const [lpassword, setLpassword] = useState('');
   
    const [message, setMessage] = useState('');


    const handleLogin = async () => {
        const data = {lusername, lpassword}
        try {
            await axios.post('http://localhost:5001/login', data);
            setMessage('Login successful.');
            navigate("/lists");
        } catch (error) {
            setMessage('User not found');
        }
    };

    return (
        <div className='auth-container'>
            <h2 className='auth-heading'>Login</h2>
            <input className='auth-input' type="text" placeholder="Username" value={lusername} onChange={e => setLusername(e.target.value)} />
            <input className='auth-input' type="text" placeholder="Email" value={lemail} onChange={e => setLemail(e.target.value)} />            
            <input className='auth-input' type="password" placeholder="Password" value={lpassword} onChange={e => setLpassword(e.target.value)} />
            <button className='auth-button' onClick={handleLogin}>Login</button>

            <p className='auth-error'>{message}</p>
            <p>Don't have an account? <a className='auth-register' href="/register">Sign up</a></p>
        </div>
    );
}

export default AuthComponent;