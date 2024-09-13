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
import FeedbackPopup from '../../Components/FeedbackPopup/FeedbackPopup';

const Login = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [popupMessage, setPopupMessage] = useState(null); // Popup message
    const [popupType, setPopupType] = useState(''); // Popup type ('success' or 'error')
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        }

        if (isValid) {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser) {
                const secretKey = 'mySecretKey';
                const decryptedPassword = CryptoJS.AES.decrypt(storedUser.password, secretKey).toString(CryptoJS.enc.Utf8);

                if (storedUser.email === email && decryptedPassword === password) {
                    login(email);
                    setPopupType('success');
                    setPopupMessage('Login successful!');
                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                } else {
                    setPopupType('error');
                    setPopupMessage('Invalid credentials. Please try again.');
                }
            } else {
                setPopupType('error');
                setPopupMessage('No registered users found. Please register first.');
            }
        }
    };

    const closePopup = () => {
        setPopupMessage(null);
    };

    return (
        <FormContainer title="Login">
            <InputField
                type="email"
                placeholder="Email"
                icon={emailImg}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />
            <InputField
                type="password"
                placeholder="Password"
                icon={passwordImg}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />
            <Button text="Login" onClick={handleLogin} />

            <p className="toggle-text">
                Don't have an account?{' '}
                <span className="toggle-link" onClick={toggleForm}>
                    <Link to="/register">Register Here</Link>
                </span>
            </p>

            {popupMessage && (
                <FeedbackPopup
                    message={popupMessage}
                    type={popupType}
                    onClose={closePopup}
                />
            )}
        </FormContainer>
    );
};

export default Login;
