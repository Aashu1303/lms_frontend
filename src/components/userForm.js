import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/userForm.css';

const UserForm = () => {
    const [userName, setUserName] = useState('Loading...');

    useEffect(() => {
        // const storedUserId = localStorage.getItem('userId');
        const API_BASE_URL = 'http://localhost:3000';

        const fetchUserName = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                setUserName(response.data.username);
            } catch (error) {
                console.error('Error fetching user name:', error);
                setUserName('User');
            }
        };

        fetchUserName();
    }, []);

    return (
        <div className="user-dashboard">
            <h2>Welcome, {userName}!</h2>
            <div className="options">
                <Link to="/laundryform" className="option-button">
                    New Request
                </Link>
                <Link to="/previousrequests" className="option-button">
                    Previous Requests
                </Link>
                <Link to="/profile" className="option-button">
                    Profile
                </Link>
            </div>
        </div>
    );
};

export default UserForm;
