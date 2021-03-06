import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className = "review-item">
            <p>Item Review: {name}</p>
            <p>Quantity: {quantity}</p>
            <p>Unit Price: $ {price}</p>
            <p>Total Price: $ {price * quantity}</p>
            <button className="main-button" onClick = {() => props.removeProduct(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;