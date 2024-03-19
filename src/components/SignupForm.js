import React, { useState } from 'react';
import './css/LoginForm.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const API_BASE_URL = 'http://localhost:3000';
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                username,
                password,
                email,
            });

            console.log('Signup Successful:', response.data);
            navigate('/'); // Redirect to login on success

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('A network error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-bold mb-6">Signup for Laundry Management</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-gray-600 block mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-600 block mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-gray-600 block mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Signup'}
                    </button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <Link to="/" className="block text-center text-blue-500 hover:underline">
                        Have an account? Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
