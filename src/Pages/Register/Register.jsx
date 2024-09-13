import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userImg from '../../assets/person.png';
import emailImg from '../../assets/email.png';
import passwordImg from '../../assets/password.png';
import './register.css';
import InputField from '../../Components/InputField/InputField';
import FormContainer from '../../Components/FormContainer/FormContainer';
import Button from '../../Components/Button/Button';
import CryptoJS from 'crypto-js';
import FeedbackPopup from '../../Components/FeedbackPopup/FeedbackPopup';

const Register = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [popupMessage, setPopupMessage] = useState(null); // Popup message
    const [popupType, setPopupType] = useState(''); // Popup type ('success' or 'error')
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long and include a number and a special character';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = () => {
        if (!validate()) {
            return;
        }

        const registrationSuccess = true;

        if (registrationSuccess) {
            const secretKey = 'mySecretKey';
            const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

            const userData = { name, email, password: encryptedPassword };
            localStorage.setItem('user', JSON.stringify(userData));

            setPopupType('success');
            setPopupMessage('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            setPopupType('error');
            setPopupMessage('Registration failed. Please try again.');
        }
    };

    const closePopup = () => {
        setPopupMessage(null);
    };

    return (
        <FormContainer title="Register">
            <InputField
                type="text"
                placeholder="Name"
                icon={userImg}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
            />

            <InputField
                type="email"
                placeholder="Email"
                icon={emailImg}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
            />

            <InputField
                type="password"
                placeholder="Password"
                icon={passwordImg}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />

            <InputField
                type="password"
                placeholder="Confirm Password"
                icon={passwordImg}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
            />

            <Button text="Register" onClick={handleRegister} />

            <p className="toggle-text">
                Already have an account?{' '}
                <Link to="/login" className="toggle-link">
                    Login here
                </Link>
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

export default Register;
