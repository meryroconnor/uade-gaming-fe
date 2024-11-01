import React, { useState } from 'react';
import './Buyout.css';

const BillingForm = () => {
    const [billingInfo, setBillingInfo] = useState({
        type: '',
        cardNumber: '',
        securityCode: '',
        dueDate: '',
        owner: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submission logic here
        console.log(billingInfo);
    };

    return (
        <div className="modal">
            <div className="overlay"></div>
            <form onSubmit={handleSubmit} className="form">
                <h2 className="title">Billing Info</h2>
                <select
                    name="previouslyUsed"
                    onChange={handleChange}
                    className="input"
                >
                    <option value="">Select Previously used</option>
                    {/* Populate options dynamically if available */}
                </select>
                <select
                    name="type"
                    value={billingInfo.type}
                    onChange={handleChange}
                    className="input"
                >
                    <option value="">Select Type</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <input
                    type="text"
                    name="cardNumber"
                    value={billingInfo.cardNumber}
                    onChange={handleChange}
                    placeholder="Card number"
                    className="input"
                />
                <input
                    type="text"
                    name="securityCode"
                    value={billingInfo.securityCode}
                    onChange={handleChange}
                    placeholder="Security Code"
                    className="input"
                />
                <input
                    type="text"
                    name="dueDate"
                    value={billingInfo.dueDate}
                    onChange={handleChange}
                    placeholder="Due date"
                    className="input"
                />
                <input
                    type="text"
                    name="owner"
                    value={billingInfo.owner}
                    onChange={handleChange}
                    placeholder="Owner"
                    className="input"
                />
                <button type="submit" className="button">
                    Confirm Purchase!
                </button>
            </form>
        </div>
    );
};

export default BillingForm;
