import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/NavBar.css'; // Your CSS file


const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const handleViewBucket = () => {
        navigate('/view-bucket');
    };

    return (
        <nav className="navbar">
            <Link to="/profile" className="navbar-link">Profile</Link>
            <button onClick={handleViewBucket} className="navbar-button">View Bucket</button>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
        </nav>
    );
};

export default Navbar;
