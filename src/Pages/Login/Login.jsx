import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 
import emailImg from '../../assets/email.png';
import passwordImg from '../../assets/password.png';
import './login.css';
import InputField from '../../Components/InputField/InputField';
import FormContainer from '../../Components/FormContainer/FormContainer';
import Button from '../../Components/Button/Button';

const Login = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const { login } = useAuth(); 

    const handleLogin = () => {
        if (email && password) {
            login(email);  // Pass email or username to login
            alert('Login successful!');
            navigate('/home'); 
        } else {
            alert('Please fill in both email and password.');
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
