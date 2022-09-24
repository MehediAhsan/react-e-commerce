import React from 'react';
import './Product.css';

const Product = (props) => {
    const {img,name,price,seller,rating} = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>Price: ${price}</p>
                <p className='product-bottom'>Seller: {seller}</p>
                <p className='product-bottom'>Rating: {rating} star</p>
            </div>
            <button className='btn-cart'><p>Add to Cart</p></button>         
        </div>
    );
};

export default Product;