import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPriceWithDiscount } from '../../utilities';
import './styles.css';

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
    <div className='col-12 col-lg-6 col-xl-4 mb-4'>
        <div className='card text-muted'>
          <Link to={`/products/${id}`} className='text-decoration-none'>
            <img className='card-img-top object-cover' src={thumbnail} alt={title} width='180' height='180' />
          </Link>
          <div className='card-body' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h6 className='card-title'>{title}</h6>
              <div className='card-text lh-1' style={{ maxHeight: '100px' }}>{cuttedDescription}</div>
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
