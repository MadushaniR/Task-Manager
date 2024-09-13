import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import userImg from '../../assets/person.png';
import emailImg from '../../assets/email.png';
import passwordImg from '../../assets/password.png';
import './register.css';
import InputField from '../../Components/InputField/InputField';
import FormContainer from '../../Components/FormContainer/FormContainer';
import Button from '../../Components/Button/Button';

const Register = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(''); // State to handle success or failure messages
    const navigate = useNavigate(); // Hook for navigation

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation (at least 8 characters, including a number and a special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long and include a number and a special character';
        }

        // Confirm password validation
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
            return; // Don't proceed if validation fails
        }

        // Simulate a registration process
        // You should replace this with an actual API call
        const registrationSuccess = true; // Simulate success or failure

        if (registrationSuccess) {
            setMessage('Registration successful!');
            setTimeout(() => {
                navigate('/login'); // Navigate to login page after success
            }, 1000); // Delay to show success message
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
            
            {message && <p className="message">{message}</p>} {/* Display success or failure message */}

            <p className="toggle-text">
                Already have an account?{' '}
                <span className="toggle-link" onClick={toggleForm}>
                <Link to="/login">Login Here</Link>
                </span>
            </p>
        </FormContainer>
    );
};

export default Register;
