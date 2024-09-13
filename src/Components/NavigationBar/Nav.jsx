import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import todoImg from '../../assets/todoImg.png'; 

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
                <Link to="/home">
                    <img src={todoImg} alt="Home" className="nav-logo" />
                </Link>
            </div>
            <div className="nav-right">
                {username ? (
                    <>
                        <span>Welcome, {username}</span>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Nav;
