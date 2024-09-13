import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.name) {
            setUsername(storedUser.name);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-right">
                {username ? (
                    <span>Welcome, {username}</span>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Nav;
