import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import './css/PreviousRequests.css';

const PreviousRequests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const userId = jwtDecode(token).userId;

                const API_BASE_URL = 'http://localhost:3000/orders/user/'; // Adjust endpoint
                const response = await axios.get(`${API_BASE_URL}${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleQRCodeClick = (requestId) => {
        setSelectedRequestId(requestId);
        setShowQRCode(true);
    };

    const handleCloseQRCode = () => {
        setShowQRCode(false);
    };

    return (
        <div className="previous-requests">
            <h2>Your Previous Requests</h2>

            {requests.length === 0 ? (
                <p>You don't have any previous requests.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            {/* Add more columns as needed */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{request._id}</td>
                                <td>{new Date(request.createdAt).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleQRCodeClick(request._id)}>
                                        View QR Code
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showQRCode && selectedRequestId && (
                <div className="qr-code-modal">
                    <button onClick={handleCloseQRCode}>Close</button>
                    {/* Assuming qrCodeData is available in your request object */}
                    <img src={`data:image/png;base64,${requests.find(r => r._id === selectedRequestId).qrCodeData}`} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default PreviousRequests;
