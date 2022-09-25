import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = ({product, handleAddToCart}) => {
    const {img,name,price,seller,ratings} = product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>Price: ${price}</p>
                <p className='product-bottom'>Seller: {seller}</p>
                <p className='product-bottom'>Rating: {ratings} star</p>
            </div>
            <button onClick={() => handleAddToCart(product)} className='btn-cart'><p>Add to Cart</p><FontAwesomeIcon icon={faShoppingCart} /></button>         
        </div>
    );
};

export default Product;