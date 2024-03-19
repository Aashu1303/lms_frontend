import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/NavBar.css'; // Your CSS file


const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/profile" className="navbar-link">Profile</Link>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
        </nav>
    );
};

export default Navbar;
