import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    console.log(products);

    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product product={product} key={product.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <h3>Order Summary</h3>
            </div>
        </div>
    );
};

export default Shop;