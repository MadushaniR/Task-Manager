import React, { useState } from 'react';
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

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Registration successful!');
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
            <InputField
                type="password"
                placeholder="Confirm your password"
                icon={passwordImg}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button text="Register" onClick={handleRegister} />
            <p className="toggle-text">
                Already have an account?{' '}
                <span className="toggle-link" onClick={toggleForm}>
                    Login here
                </span>
            </p>
        </FormContainer>
    );
};

export default Register;

