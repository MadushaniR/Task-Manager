import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { useAuth } from '../../context/AuthContext';

const Nav = () => {
    const { isAuthenticated, user } = useAuth(); // Access user from context

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-right">
                {isAuthenticated ? (
                    <span>Welcome, {user}</span>  // Display username
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Nav;
