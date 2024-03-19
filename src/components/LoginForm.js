import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from './utility/authSlice';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const API_BASE_URL = 'http://localhost:3000';
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            dispatch(loginSuccess(response.data));
            navigate('/userform'); // Navigate on successful login
        } catch (error) {
            const message = error.response && error.response.data
                ? error.response.data.message
                : 'A network error occurred. Please try again.';
            dispatch(loginFailure(message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-bold mb-6">One Campus</h2>
                <form onSubmit={handleSubmit}>
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
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <Link to="/signup" className="block text-center text-blue-500 hover:underline">
                        Don't have an account? Sign up here!
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;