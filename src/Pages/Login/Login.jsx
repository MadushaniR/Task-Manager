import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 
import emailImg from '../../assets/email.png';
import passwordImg from '../../assets/password.png';
import './login.css';
import InputField from '../../Components/InputField/InputField';
import FormContainer from '../../Components/FormContainer/FormContainer';
import Button from '../../Components/Button/Button';
import CryptoJS from 'crypto-js';

const Login = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const { login } = useAuth(); 

    const handleLogin = () => {
        if (email && password) {
            
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser) {
             
                const secretKey = 'mySecretKey'; 
                const decryptedPassword = CryptoJS.AES.decrypt(storedUser.password, secretKey).toString(CryptoJS.enc.Utf8);

               
                if (storedUser.email === email && decryptedPassword === password) {
                    login(email); 
                    setMessage('Login successful!');
                    setTimeout(() => {
                        navigate('/home'); 
                    }, 1000);
                } else {
                    setMessage('Invalid credentials. Please try again.');
                }
            } else {
                setMessage('No registered users found. Please register first.');
            }
        } else {
            setMessage('Please fill in both email and password.');
        }
    };

    return (
        <FormContainer title="Login">
            <InputField
                type="email"
                placeholder="Enter your email"
                icon={emailImg}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Enter your password"
                icon={passwordImg}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Login" onClick={handleLogin} />
            {message && <p className="message">{message}</p>} 

            <p className="toggle-text">
                Don't have an account?{' '}
                <span className="toggle-link" onClick={toggleForm}>
                    <Link to="/register">Register Here</Link>
                </span>
            </p>
        </FormContainer>
    );
};

export default Login;
