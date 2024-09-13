import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userImg from '../../assets/person.png';
import emailImg from '../../assets/email.png';
import passwordImg from '../../assets/password.png';
import './register.css';
import InputField from '../../Components/InputField/InputField';
import FormContainer from '../../Components/FormContainer/FormContainer';
import Button from '../../Components/Button/Button';
import CryptoJS from 'crypto-js'; // Importing crypto-js for encryption

const Register = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
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

            setMessage('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <FormContainer title="Register">
            <InputField
                type="text"
                placeholder="Enter your name"
                icon={userImg}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            
            <InputField
                type="email"
                placeholder="Enter your email"
                icon={emailImg}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <InputField
                type="password"
                placeholder="Enter your password"
                icon={passwordImg}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <InputField
                type="password"
                placeholder="Confirm your password"
                icon={passwordImg}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <Button text="Register" onClick={handleRegister} />
            
            {message && <p className="message">{message}</p>}

            <p className="toggle-text">
                Already have an account?{' '}
                <Link to="/login" className="toggle-link">
                    Login here
                </Link>
            </p>
        </FormContainer>
    );
};

export default Register;
