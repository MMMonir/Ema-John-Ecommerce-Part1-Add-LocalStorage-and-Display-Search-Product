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

- # Product.js
```
import React from 'react';
import Rating from 'react-rating';
import './Product.css';

const Product = ({product, handleAddToCart}) => {
    return (
        <div>
            <div className="singleProduct">
                <div><img src={product.img} alt="" /></div>
                <div>
                <h4>{product.name}</h4>
                    <p>By: {product.seller}</p>
                    <h5>Price: ${product.price}</h5>
                    <p>only {product.stock} left in stock - order soon</p>
                    <div>
                        <Rating
                            initialRating={product.star}
                            emptySymbol="far fa-star"
                            fullSymbol="fas fa-star"
                            readonly
                        />
                    </div>
                    <button 
                        className="btnCart" 
                        onClick={() => handleAddToCart(product)}
                        >Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
```

- # Cart.js
```
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
```

- # fakedb.js
```
const getDb = () => localStorage.getItem('shopping_cart');
const updateDb = cart => localStorage.setItem('shopping_cart', JSON.stringify(cart));

const addToDb = id => {
  const exists = getDb();
  let shopping_cart = {};
  if(!exists){
      shopping_cart[id] = 1;
  }
  else{
      shopping_cart = JSON.parse(exists);
      if(shopping_cart[id]){
          const newCount = shopping_cart[id] + 1;
          shopping_cart[id] = newCount;
      }
      else{
          shopping_cart[id] = 1;
      }
  }
  updateDb(shopping_cart);
}

const removeFromDb = id => {
  const exists = getDb();
  if(!exists){
      
  }
  else{
      const shopping_cart = JSON.parse(exists);
      delete shopping_cart[id];
      updateDb(shopping_cart);
  }
}

const getStoredCart = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
}

const clearTheCart = () => {
  localStorage.removeItem('shopping_cart');
}

export { addToDb, removeFromDb, getStoredCart, clearTheCart };
```