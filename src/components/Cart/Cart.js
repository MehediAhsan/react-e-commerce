import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {

    let total = 0;
    let shipping = 0;
    let quantity = 0;

    for(const product of cart){
        quantity += product.quantity;
        total += product.price * product.quantity;
        shipping += product.shipping;
    }

    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;

    return (
        <div className='cart'>
            <h3 className='order-summary'>Order Summary</h3>
            <div className='cart-info'>
                <p>Selected items: {quantity}</p>
                <p>Total Price: ${total}</p>
                <p>Total Shipping: ${shipping}</p>
                <p>Tax: {tax}</p>
                <h4>Grand Total: {grandTotal.toFixed(2)}</h4>
            </div>
        </div>
    );
};

export default Cart;