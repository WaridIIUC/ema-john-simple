import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import confirmImage from '../../images/confirmation.png'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);

    const removeProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push("/shipment");
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        
    }

    let thankyou ;
    if(orderPlaced){
        thankyou = <img src={confirmImage} alt =""/>
    }
    return (

        <div className = "shop-container">
              
            <div className="product-container">
            <h1>Cart item: {cart.length} </h1>
            {thankyou}  
            {
                cart.map(pd => <ReviewItem product = {pd} 
                    removeProduct ={removeProduct}
                    key={pd.key}></ReviewItem>)
            }
            </div>
             
            <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>
            </div>
            
        </div>

    );
};

export default Review;