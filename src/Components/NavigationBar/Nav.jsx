import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import todoImg from '../../assets/todoImg.png';
import { FaUserCircle } from 'react-icons/fa'; 

const Nav = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.name) {
            setUsername(storedUser.name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUsername(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/home" className="nav-logo-container">
                    <img src={todoImg} alt="Home" className="nav-logo" />
                    <span className="app-name">TaskTrek</span>
                </Link>
            </div>
            <div className="nav-center">
                <Link to="/home" className="nav-option">Home</Link>
                <Link to="/help" className="nav-option">Help</Link>
            </div>
            <div className="nav-right">
                {username ? (
                    <div className="user-info">
                        <FaUserCircle className="user-icon" />
                        <span className="username">{username}</span>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Nav;
