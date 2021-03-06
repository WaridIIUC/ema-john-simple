import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
     const totalPrice = cart.reduce((total, prd ) => total+prd.price * prd.quantity, 0);

    // let total =0;
    // for(let i=0 ; i<cart.length; i++){
    //     const product = cart[i];
    //     total = total + product.price;
    // }
    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice<=15 && totalPrice >0){
        shipping = 12.99;
    }
    return (
        <div>
                <h5>Order Summary</h5>
                <p>Items Ordered: {cart.length}</p>
                {/* <p>Product Cost: {Math.round(totalPrice)}</p> */}
                <p>Product Cost: {(totalPrice).toFixed(2)}</p>
                <p>Shipping Cost: {shipping}</p>
                <p>Total Price: {totalPrice + shipping}</p>
                {props.children}
                
                
        </div>
    );
};

export default Cart;