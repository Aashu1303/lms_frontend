import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LaundryForm = () => {
    const [clothes, setClothes] = useState([]);
    const [newClothesFields, setNewClothesFields] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [orderResponse, setOrderResponse] = useState(null);

    const handleAddClothes = () => {
        setClothes([...clothes, { type: '', washType: '', quantity: 0 }]);
        setNewClothesFields(true);
    };

    const handleInputChange = (event, index) => {
        const updatedClothes = [...clothes];
        updatedClothes[index][event.target.name] =
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value;
        setClothes(updatedClothes);
    };

    const handleRemoveItem = (index) => {
        setClothes(clothes.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const API_BASE_URL = 'http://localhost:3000/order/submit';
            const response = await axios.post(API_BASE_URL, clothes);
            console.log('Order submitted:', response.data);
            setOrderResponse(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('An error occurred while submitting your order. Please try again.');
        }
    };

    useEffect(() => {
        if (orderResponse) {
            document.getElementById('qr-code-container').innerHTML = "";
            const img = document.createElement('img');
            img.src = `data:image/png;base64,${orderResponse.qrCodeData}`;
            document.getElementById('qr-code-container').appendChild(img);
        }
    }, [orderResponse]);

    return (
        <div>
            <h2>Laundry Form</h2>
            <button onClick={handleAddClothes}>Add Clothes</button>

            {clothes.map((item, index) => (
                <div key={index}>
                    <label htmlFor={`type-${index}`}>Type:</label>
                    <select
                        id={`type-${index}`}
                        name="type"
                        value={item.type}
                        onChange={(e) => handleInputChange(e, index)}
                    >
                        <option value="">Select Type</option>
                        <option value="Bedsheet">Bedsheet</option>
                        <option value="Regular">Regular</option>
                        <option value="Winter">Winter</option>
                    </select>

                    <label htmlFor={`washType-${index}`}>Wash Type:</label>
                    <select
                        id={`washType-${index}`}
                        name="washType"
                        value={item.washType}
                        onChange={(e) => handleInputChange(e, index)}
                    >
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

                    <label htmlFor={`quantity-${index}`}>Quantity:</label>
                    <input
                        type="number"
                        id={`quantity-${index}`}
                        name="quantity"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(e, index)}
                    />

                    <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
            ))}

            <button type="submit" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Order'}
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div id="qr-code-container"></div>
        </div>
    );
};

export default LaundryForm;
