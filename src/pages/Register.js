import React, { useState } from 'react';
import './Register.css';

const RegistrationComponent = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState('user');

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="registrationContainer">
        <div
          className={`formSection ${activeForm === 'user' ? 'active' : 'inactiveUser'}`}
          onClick={() => setActiveForm('user')}
        >
          <h2 className="formTitle">Sign Up</h2>
          <form className="form">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Last name" />
            <input type="date" placeholder="Birth date" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="submitButton">Register</button>
            <a href="#" className="loginLink">Log in</a>
          </form>
        </div>
        <div


          className={`formSection ${activeForm === 'store' ? 'activeStore' : 'inactiveStore'}`}
          onClick={() => setActiveForm('store')}
        >

          <button class="close-btn" onClick={onClose}>×</button>

          <h2 className="formTitle" style={{
            color: activeForm === 'store' ? '#1c0020' : '#cccccc',
            borderBottom: activeForm === 'store' ? '2px solid #1c0020' : '2px solid #cccccc'
          }}>Store Registration</h2>
          <form className="form">
            <input type="text" placeholder="Store name" />
            <input type="text" placeholder="CUIT" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="submitButton">Start selling!</button>
            <a href="#" className="loginLink" style={{ color: '#1c0020', fontWeight: 'bold' }}>Log in</a>
          </form>
        </div>
      </div>

    </div>

  );
};

export default RegistrationComponent;
