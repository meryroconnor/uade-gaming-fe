import React, { useState } from 'react';
import './Login.css';
import LoginImage from '../images/LoginImage.png';

const LoginComponent = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [asCompany, setAsCompany] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
            asCompany,
        };

        // Choose the appropriate API endpoint based on checkbox status
        const apiUrl = asCompany
            ? 'http://127.0.0.1:3000/companies/login'
            : 'http://127.0.0.1:3000/users/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            onClose();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className='modal'>
            <div className="overlay"></div>
            <div className="mainContainer">
                <div className="imageContainer">
                    <img
                        src={LoginImage}
                        alt="Gaming Illustration"
                        className="image"
                    />
                </div>
                <div className="formContainer">
                    <button className="close-btn" onClick={onClose}>×</button>

                    <h2 className="title">Welcome Back!</h2>
                    <p className="subtitle">Find awesome games<br />Explore new dimensions</p>

                    {errorMessage && <p className="error">{errorMessage}</p>}

                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="checkboxContainer">
                            <input
                                type="checkbox"
                                id="asCompany"
                                className="checkbox"
                                checked={asCompany}
                                onChange={(e) => setAsCompany(e.target.checked)}
                            />
                            <label htmlFor="asCompany" className="checkboxLabel">As a company</label>
                        </div>

                        <button type="submit" className="loginButton">Log in</button>
                    </form>
                    <div className="footer">
                        <a href="/forgot-password" className="link">Forgot Password</a>
                        <span className="divider"> | </span>
                        <a href="/sign-up" className="link">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
