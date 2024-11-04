import React, { useState } from 'react';
import './Login.css';
import LoginImage from '../images/LoginImage.png';
import { useUser } from '../userContext';
import { authService } from '../services/authService';

const LoginComponent = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useUser();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const data = await authService.login(email, password);
            console.log('Login successful:', data);
            
            login(data); // Update user context with the response data
            onClose(); // Close the login modal
            
            // Reset form
            setEmail('');
            setPassword('');
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
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
                    <button 
                        className="close-btn" 
                        onClick={onClose}
                        disabled={isLoading}
                    >×</button>

                    <h2 className="title">Welcome Back!</h2>
                    <p className="subtitle">Find awesome games<br />Explore new dimensions</p>

                    {errorMessage && (
                        <p className="error" role="alert">{errorMessage}</p>
                    )}

                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />

                        <button 
                            type="submit" 
                            className="loginButton"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
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