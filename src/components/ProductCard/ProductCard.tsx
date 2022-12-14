import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPriceWithDiscount } from '../../utilities';
import './styles.scss';

interface ProductCardProps {
  id: number,
  description: string,
  title: string,
  price: number,
  thumbnail: string;
  discountPercentage: number,
  stock: number;
  addToCart: () => void;
}

const descriptionLength = 201;
const dots = '...';

const ProductCard: FC<ProductCardProps> = ({
  id, thumbnail, description, title, price, discountPercentage, stock, addToCart,
}) => {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart();
  };

  const cuttedDescription = description.length >= descriptionLength - 1
    ? `${description.substring(0, descriptionLength - dots.length)}${dots}` : description;

  return (
    <div to={`/products/${id}`} className='text-decoration-none'>
        <div className='card text-muted'>
          <img className='card-img-top' src={thumbnail} alt={title} width='180' height='180' />
          <div className='card-body' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h6 className='card-title'>{title}</h6>
              <p className='card-text lh-1'>{cuttedDescription}</p>
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <span className='text-decoration-line-through'>{price}$</span>
                <span className='text-danger'>{getPriceWithDiscount(price, discountPercentage).toFixed(2)}$</span>
                <span>{stock}</span>
                {stock
                  ? <button className='btn btn-primary' onClick={handleClick}>
                    {t('add')}
                  </button>
                  : <></>
                }
              </div>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
