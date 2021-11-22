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