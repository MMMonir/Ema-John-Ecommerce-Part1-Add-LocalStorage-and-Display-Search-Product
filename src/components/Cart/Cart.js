import React from 'react';

const Cart = ({cart}) => {

    let totalQuantity = 0;
    //Total Price Calculation
    let total = 0;
    for (const product of cart){
            if(!product.quantity){
                product.quantity = 1;
            }
            total = total + product.price * product.quantity;
            totalQuantity = totalQuantity + product.quantity;
        }
    
    const shipping = (total > 0) ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;
    //Other for Total Process
    // const total = cart.reduce( (previous, product) => previous + product.price, 0);
        return (
            <div>
            <h3>Order Summary</h3>
            <h4>Items Orders: {totalQuantity}</h4>
            <p>Price: ${total.toFixed(2)}</p>
            <p>Shipping: ${shipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Total: ${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;