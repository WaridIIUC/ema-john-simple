import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product =  fakeData.find(pd => pd.key === productKey);
   
    return (
        <div>
            <Product product = {product} showAddToCart = {false}></Product>
            {/* <p>{product.category}</p>
            <h4>{product.name} Product Details</h4>
            <img src={product.img} alt=""/>
            <p>Features: </p>
            <ul>
                {
                    product.features.map(feature => <li>{feature.description}: {feature.value}</li>)
                }
            </ul>
            <h3>Price: {product.price}</h3>
            <p>Seller: {product.seller}</p> */}
        </div>
    );
};

export default ProductDetail;