import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getPriceWithDiscount } from '../../utilities';

interface ProductInfoProps {
    category: string;
    title: string;
    rating: number;
    price: number;
    stock: number;
    discountPercentage: number;
    addToCart: () => void;
    removeFromCart: () => void;
}

const ProductInfo: FC<ProductInfoProps> = ({
  category, title, rating, price, discountPercentage, stock, addToCart, removeFromCart,
}) => {
  const { t } = useTranslation();

  return (
    <div className='col-md-6'>
        <a href={`/?category=${category}`} className='mb-4 d-block'>#{category}</a>
        <h1 className='mb-1'>{title}</h1>
        <div className='mb-4'>{t('rating')}: {rating} &#9733;</div>
        <i className='bi bi-star-fill'></i>
        <div className='fs-4'>
            <span className='me-3 text-decoration-line-through'>{price}$</span>
            <span className='fw-bold text-dark'>
              {getPriceWithDiscount(price, discountPercentage).toFixed(2)}$
            </span>
            <span><small className='fs-6 ms-2 text-danger'>{discountPercentage}% Off</small></span>
        </div>
        <hr className='my-6' />
        <span className='me-4'>{stock}</span>
        {
          <button className='btn btn-primary' onClick={addToCart}>{t('add')}</button>
        }
    </div>
  );
};

export default ProductInfo;
