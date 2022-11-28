import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './styles.scss';

interface ProductCardProps {
  id: number,
  description: string,
  title: string,
  price: number,
  thumbnail: string;
  isInCart: boolean,
  addToCart: () => void;
}

const descriptionLength = 201;
const dots = '...';

const ProductCard: FC<ProductCardProps> = ({
  id, thumbnail, description, title, price, isInCart, addToCart,
}) => {
  const { t } = useTranslation();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart();
  };

  const cuttedDescription = description.length >= descriptionLength - 1
    ? `${description.substring(0, descriptionLength - dots.length)}${dots}` : description;

  return (
    <Link to={`/products/${id}`} className='text-decoration-none'>
        <div className='card text-muted'>
          <img className='card-img-top' src={thumbnail} alt={title} width='180' height='180' />
          <div className='card-body' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h6 className='card-title'>{title}</h6>
              <p className='card-text lh-1'>{cuttedDescription}</p>
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <span className='card-text'>{price} $</span>
                {
                  isInCart ? <button className='btn btn-secondary' onClick={(e) => e.preventDefault()}>{t('added')}</button>
                    : <button className='btn btn-primary' onClick={handleClick}>
                        {t('add')}
                      </button>
                }
              </div>
          </div>
        </div>
    </Link>
  );
};

export default ProductCard;
