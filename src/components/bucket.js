import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBucketComponent = () => {
    const [bucketItems, setBucketItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const API_BASE_URL = 'http://localhost:3000/order/fetch-bucket';
                const bearerToken = localStorage.getItem('authToken');

                if (!bearerToken) {
                    throw new Error('Bearer token not found');
                }

                const response = await axios.get(API_BASE_URL, {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`
                    }
                });

                setBucketItems(response.data);

            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred while fetching bucket items.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event, index) => {
        const updatedItems = [...bucketItems];
        updatedItems[index][event.target.name] = event.target.value;
        setBucketItems(updatedItems);
    };

    const handleSaveItem = async (item, index) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const API_URL = `http://localhost:3000/order/edit-bucket-item/${index}`;
            const bearerToken = localStorage.getItem('authToken');

            if (!bearerToken) {
                throw new Error('Bearer token not found');
            }

            await axios.put(API_URL, item, {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                }
            });

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while updating the item.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleDeleteItem = async (index) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const API_URL = `http://localhost:3000/order/remove-bucket-item/${index}`;
            const bearerToken = localStorage.getItem('authToken');

            if (!bearerToken) {
                throw new Error('Bearer token not found');
            }

            await axios.put(API_URL, {}, { // Send an empty object with PUT
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                }
            });

            setBucketItems(bucketItems.filter((_, i) => i !== index));

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while deleting the item.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitOrder = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const API_URL = 'http://localhost:3000/order/submit';
            const bearerToken = localStorage.getItem('authToken');

            if (!bearerToken) {
                throw new Error('Bearer token not found');
            }

            const response = await axios.post(API_URL, bucketItems, {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                }
            });

            // Handle successful order submission (e.g., clear bucket, show message)
            console.log('Order submitted:', response.data);
            setBucketItems([]); // Assuming you want to clear the bucket
            setErrorMessage('Order submitted successfully!');

        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while submitting the order.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="view-bucket-container">
            <h2>My Bucket</h2>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!isLoading && !errorMessage && bucketItems.length === 0 && (<p>Your bucket is empty.</p>)}

            <table className="bucket-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Wash Type</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bucketItems.map((item, index) => (
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
                                <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleInputChange(e, index)} />
                            </td>
                            <td>
                                <button onClick={() => handleSaveItem(item, index)}>Save</button>
                                <button onClick={() => handleDeleteItem(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmitOrder} disabled={isLoading}>
                {isLoading ? 'Submitting Order...' : 'Submit Order'}
            </button>
        </div>
    );
};

export default ViewBucketComponent;
