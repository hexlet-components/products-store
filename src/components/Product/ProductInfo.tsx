import React, { FC } from 'react';

interface ProductInfoProps {
    category: string;
    title: string;
    rating: number;
    price: number;
    discountPercentage: number;
    isInCart: boolean;
    addToCart: () => void;
    removeFromCart: () => void;
}

const ProductInfo: FC<ProductInfoProps> = ({
  category, title, rating, price, discountPercentage, isInCart, addToCart, removeFromCart,
}) => (
    <div className='col-md-6'>
        <div>
            <a href="#" className='mb-4 d-block'>#{category}</a>
            <h1 className='mb-1'>{title}</h1>
            <div className='mb-4'>{rating}</div>
            <i className='bi bi-star-fill'></i>
            <div className='fs-4'>
                <span className='fw-bold text-dark'>{price} $</span>
                <span><small className='fs-6 ms-2 text-danger'>{discountPercentage} Off</small></span>
            </div>
            <hr className='my-6' />
            {
                isInCart ? <button className='btn btn-danger' onClick={removeFromCart}>Remove form cart</button>
                  : <button className='btn btn-primary' onClick={addToCart}>Add to cart</button>
            }
        </div>
    </div>
);

export default ProductInfo;
