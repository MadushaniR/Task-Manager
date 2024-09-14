import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import todoImg from '../../assets/todoImg.png';
import { FaUserCircle, FaHome, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

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
                    <span className="app-name desktop-only">TaskTrek</span>
                </Link>
            </div>
            <div className="nav-center">
                <div className="nav-links">
                    <Link to="/home" className="nav-option desktop-only">Home</Link>
                    <Link to="/help" className="nav-option desktop-only">Help</Link>
                    <Link to="/home" className="nav-icon mobile-only">
                        <FaHome />
                    </Link>
                    <Link to="/help" className="nav-icon mobile-only">
                        <FaQuestionCircle />
                    </Link>
                </div>
            </div>
            <div className="nav-right">
                {username ? (
                    <div className="user-info desktop-only">
                        <FaUserCircle className="user-icon" />
                        <span className="username">{username}</span>
                        <button className="logout-button" onClick={handleLogout}>
                            <FaSignOutAlt />
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="nav-icon mobile-only">
                        <FaUserCircle />
                    </Link>
                )}
                <button className="logout-button mobile-only" onClick={handleLogout}>
                    <FaSignOutAlt />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
