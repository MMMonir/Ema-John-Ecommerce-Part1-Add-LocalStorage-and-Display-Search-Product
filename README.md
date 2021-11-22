## Live Site Link: https://ecommercebymonir.netlify.app/

- # Shop.js
```
import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect( () =>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setDisplayProducts(data);
        })
    }, [])

    //GetStore cart from LocalStore
    useEffect( () => {
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart){
                const addedProduct = products.find( product => product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [products])

    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchProducts);
    }
    return (
        <>
            <div className="search-container">
                <input 
                    type="text" 
                    onChange={handleSearch}
                    placeholder="Search Product"
                />
            </div>
            <div className="container">
                <div className="shop-container">
                    <div className="product-container">
                        {
                            displayProducts.map(product => <Product 
                                key={product.key}
                                product={product} 
                                handleAddToCart={handleAddToCart}
                                ></Product>)
                        }
                    </div>
                    <div className="cart-container">
                        <Cart cart={cart}></Cart>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;
```