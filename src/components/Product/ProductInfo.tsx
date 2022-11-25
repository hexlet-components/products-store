import React, { FC } from 'react';

interface ProductInfoProps {
    category: string;
    title: string;
    rating: number;
    price: number;
    discountPercentage: number;
}

const ProductInfo: FC<ProductInfoProps> = ({
  category, title, rating, price, discountPercentage,
}) => (
    <div className='col-md-6'>
        <div className='ps-lg-10 mt-6 mt-md-0'>
            <a href="#" className='mb-4 d-block'>{category}</a>
            <h1 className='mb-1'>{title}</h1>
            <div className='mb-4'>{rating}</div>
            <div className='fs-4'>
                <span className='fw-bold text-dark'>{price}</span>
                <span><small className='fs-6 ms-2 text-danger'>{discountPercentage} Off</small></span>
            </div>
            <hr className='my-6' />
        </div>
    </div>
);

export default ProductInfo;
