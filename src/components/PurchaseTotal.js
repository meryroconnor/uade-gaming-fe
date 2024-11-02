import React from 'react';
import './PurchaseTotal.css';

const PurchaseTotal = ({
  productCount,
  productTotal,
  discount = 0.00,
  createOrder,
  cart,
  cartItems
}) => {
  const total = productTotal - discount;

  return (
    <div className="purchase-total-card">
      <h4>PURCHASE TOTAL</h4>

      <div className="details">
        <div className="detail-item">
          <span>Products ({productCount})</span>
          <span className="amount">${productTotal.toFixed(2)}</span>
        </div>
        <div className="detail-item">
          <span>Discount</span>
          <span className="amount">-${discount.toFixed(2)}</span>
        </div>
      </div>

      <hr />

      <div className="total-section">
        <span>Total</span>
        <span className="amount">${total.toFixed(2)}</span>
      </div>

      <button className="buy-now-button">Buy Now</button>
    </div>
  );
};

export default PurchaseTotal;
