import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect( () => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size])

    const pages = Math.ceil(count / size);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect( () => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product._id === id)
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product product={product} key={product._id} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link className='review-order-link' to="/orders">
                        <button className='btn-review-order'>
                            <span>Review Order</span>
                            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                        </button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p>Currently selected page: {page} and size: {size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        className={page === number && 'selected'}
                        onClick={() => setPage(number)}
                    >
                        {number}
                    </button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;