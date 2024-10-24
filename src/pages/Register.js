import React, { useState } from 'react';
import './Register.css';

const RegistrationComponent = ({ isOpen, onClose }) => {
    // State for form inputs
    const [activeForm, setActiveForm] = useState('user');
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
    });

    const [storeData, setStoreData] = useState({
        name: '',
        cuit: '',
        email: '',
        password: '',
    });

    // State for error or success messages
    const [message, setMessage] = useState(null);

    if (!isOpen) return null;

    // Handle input change for user registration
    const handleUserInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle input change for store registration
    const handleStoreInputChange = (e) => {
        setStoreData({
            ...storeData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit handler for user registration
    const handleUserSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('User registration successful!');
                setUserData({ name: '', lastName: '', birthDate: '', email: '', password: '' }); // Reset form
            } else {
                setMessage(result.error || 'User registration failed');
            }
        } catch (error) {
            setMessage('Error occurred during user registration');
            console.log(error);
        }
    };

    // Submit handler for store registration
    const handleStoreSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3000/companies/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storeData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Store registration successful!');
                setStoreData({ storeName: '', cuit: '', email: '', password: '' }); // Reset form
            } else {
                setMessage(result.error || 'Store registration failed');
            }
        } catch (error) {
            setMessage('Error occurred during store registration');
            console.log(error);
        }
    };

    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="registrationContainer">
                <div
                    className={`formSection ${activeForm === 'user' ? 'active' : 'inactiveUser'}`}
                    onClick={() => setActiveForm('user')}
                >
                    <h2 className="formTitle">User Sign Up</h2>
                    <form className="form" onSubmit={handleUserSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleUserInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={userData.lastName}
                            onChange={handleUserInputChange}
                            required
                        />
                        <input
                            type="date"
                            name="birthDate"
                            placeholder="Birth date"
                            value={userData.birthDate}
                            onChange={handleUserInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleUserInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleUserInputChange}
                            required
                        />
                        <button type="submit" className="submitButton">Register</button>
                        {message && <p className="message">{message}</p>}
                        <a href="#" className="loginLink">Log in</a>
                    </form>
                </div>

                {/* Store registration section */}
                <div
                    className={`formSection ${activeForm === 'store' ? 'activeStore' : 'inactiveStore'}`}
                    onClick={() => setActiveForm('store')}
                >
                    <button className="close-btn" onClick={onClose}>×</button>

                    <h2
                        className="formTitle"
                        style={{
                            color: activeForm === 'store' ? '#1c0020' : '#cccccc',
                            borderBottom: activeForm === 'store' ? '2px solid #1c0020' : '2px solid #cccccc'
                        }}
                    >
                        Store Registration
                    </h2>
                    <form className="form" onSubmit={handleStoreSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Store name"
                            value={storeData.storeName}
                            onChange={handleStoreInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="cuit"
                            placeholder="CUIT"
                            value={storeData.cuit}
                            onChange={handleStoreInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={storeData.email}
                            onChange={handleStoreInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={storeData.password}
                            onChange={handleStoreInputChange}
                            required
                        />
                        <button type="submit" className="submitButton">Start selling!</button>
                        {message && <p className="message">{message}</p>}
                        <a href="#" className="loginLink" style={{ color: '#1c0020', fontWeight: 'bold' }}>Log in</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationComponent;
