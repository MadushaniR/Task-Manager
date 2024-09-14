import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = React.useState(null);
    const [popupType, setPopupType] = React.useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include a number and a special character')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            const secretKey = 'mySecretKey';
            const encryptedPassword = CryptoJS.AES.encrypt(values.password, secretKey).toString();

            const userData = { name: values.name, email: values.email, password: encryptedPassword };
            localStorage.setItem('user', JSON.stringify(userData));

            setPopupType('success');
            setPopupMessage('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        },
    });

    const closePopup = () => {
        setPopupMessage(null);
    };

    return (
        <FormContainer title="Register">
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    type="text"
                    placeholder="Name"
                    icon={userImg}
                    {...formik.getFieldProps('name')}
                    error={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                />

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

                <InputField
                    type="password"
                    placeholder="Confirm Password"
                    icon={passwordImg}
                    {...formik.getFieldProps('confirmPassword')}
                    error={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
                />

                <Button text="Register" type="submit" />

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
            </form>
        </FormContainer>
    );
};

export default Register;
