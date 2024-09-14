import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = React.useState(null);
    const [popupType, setPopupType] = React.useState('');
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser) {
                const secretKey = 'mySecretKey';
                const decryptedPassword = CryptoJS.AES.decrypt(storedUser.password, secretKey).toString(CryptoJS.enc.Utf8);

                if (storedUser.email === values.email && decryptedPassword === values.password) {
                    login(values.email);
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
        },
    });

    const closePopup = () => {
        setPopupMessage(null);
    };

    return (
        <FormContainer title="Login">
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    type="email"
                    placeholder="Email"
                    icon={emailImg}
                    {...formik.getFieldProps('email')}
                    error={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    icon={passwordImg}
                    {...formik.getFieldProps('password')}
                    error={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                />
                <Button text="Login" type="submit" />

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
            </form>
        </FormContainer>
    );
};

export default Login;
