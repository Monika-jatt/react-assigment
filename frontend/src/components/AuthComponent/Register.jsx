import React, { useState } from 'react';
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [rusername, setRusername] = useState('');
    const [remail, setRemail] = useState('');
    const [rpassword, setRpassword] = useState('');

    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        const data ={rusername, rpassword};
        try {
            const userData=await axios.post('http://localhost:5001/register', data );
            console.log(userData);
            setMessage('Registration successful.');
            navigate("/");
        } catch (error) {
            setMessage('An error occurred during registration.');
        }
    };

  return (
    <div className='register-container'>
        <h2 className='register-title'>Sign up</h2>
        <input className='register-input' type="text" placeholder="Username" value={rusername} onChange={e => setRusername(e.target.value)} />
        <input className='register-input' type="text" placeholder="Email" value={remail} onChange={e => setRemail(e.target.value)} />
        <input className='register-input' type="password" placeholder="Password" value={rpassword} onChange={e => setRpassword(e.target.value)} />
        <button className='register-button' onClick={handleRegister}>sign up</button>

        <p className='register-message'>{message}</p>
        <p>Already a user?<a href="/" className='login-link'>Login here</a></p>
    </div>
  );
};

export default RegisterPage;
