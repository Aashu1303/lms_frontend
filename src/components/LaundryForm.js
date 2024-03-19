import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/LaundryForm.css';

const LaundryForm = () => {
    const [clothes, setClothes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (event, index) => {
        const updatedClothes = [...clothes];
        updatedClothes[index][event.target.name] = event.target.value;
        setClothes(updatedClothes);
    };

    const handleAddItem = () => {
        setClothes([...clothes, { type: '', washType: '', quantity: 0 }]);
    };

    const handleRemoveItem = (index) => {
        if (index > 0) {
            setClothes(clothes.filter((_, i) => i !== index));
        }
    };

    const handleAddToBucket = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const API_BASE_URL = 'http://localhost:3000/order/add-to-bucket';
            const bearerToken = localStorage.getItem('authToken');

            if (!bearerToken) {
                throw new Error('Bearer token not found');
            }

            const response = await axios.put(API_BASE_URL, clothes, {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                }
            });

            setErrorMessage('Items added to bucket successfully!');
            setClothes([]);

            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while adding to bucket.');
            }
        }
    };

    return (
        <div className='Laundry'>
            <h2>Laundry Form</h2>
            <button onClick={handleAddItem}>Add Clothes</button>

            <table className="clothes-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Wash Type</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clothes.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <select id={`type-${index}`} name="type" value={item.type} onChange={(e) => handleInputChange(e, index)}>
                                    <option value="">Select Type</option>
                                    <option value="Bedsheet">Bedsheet</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Winter">Winter</option>
                                </select>
                            </td>
                            <td>
                                <select id={`washType-${index}`} name="washType" value={item.washType} onChange={(e) => handleInputChange(e, index)}>
                                    <option value="">Select Wash Type</option>
                                    {item.type === 'Bedsheet' && <option value="Regular">Regular</option>}
                                    {item.type === 'Regular' && (
                                        <>
                                            <option value="Wash">Wash</option>
                                            <option value="Iron">Iron</option>
                                            <option value="IronWash">Iron + Wash</option>
                                        </>
                                    )}
                                    {item.type === 'Winter' && (
                                        <>
                                            <option value="Easy">Easy</option>
                                            <option value="Default">Default</option>
                                        </>
                                    )}
                                </select>
                            </td>
                            <td>
                                <input type="number" id={`quantity-${index}`} name="quantity" min="0" value={item.quantity} onChange={(e) => handleInputChange(e, index)} />
                            </td>
                            <td>
                                <button onClick={() => handleRemoveItem(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button onClick={handleAddToBucket} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add to Bucket'}
            </button>
        </div>
    );
};

export default LaundryForm;
