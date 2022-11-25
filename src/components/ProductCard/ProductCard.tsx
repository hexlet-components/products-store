import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

interface ProductCardProps {
  id: number,
  description: string,
  title: string,
  price: number,
  thumbnail: string;
}

const ProductCard: FC<ProductCardProps> = ({
  id, thumbnail, description, title, price,
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault();

    console.log('added to cart', productId);
  };

  const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <Link to={`/products/${id}`} onClick={stopPropagation}>
        <div className='card'>
                <img className='card-img-top' src={thumbnail} alt={title} width='180' height='180' />
                <div className='card-body'>
                    <h6 className='card-title'>{title}</h6>
                    <p className='card-text'>{description}</p>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <span className='card-text'>{price} ₽</span>
                        <button className='btn btn-primary' onClick={(e) => handleClick(e, id)}>
                            Add
                        </button>
                    </div>
                </div>
        </div>
    </Link>
  );
};

export default ProductCard;
