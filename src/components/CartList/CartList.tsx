import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ProductsT } from '../../types/product';
import { removeFromCart } from '../../store/reducers/cart';

interface CartListProps {
    products: ProductsT;
}

const listStyles = { border: '1px solid gray' };

const CartList: FC<CartListProps> = ({ products }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault();

    dispatch(removeFromCart(id));
  };

  return (
        <ul>
            {
                products.map((p) => (
                    <Link to={`/products/${p.id}`} className='text-decoration-none'>
                        <li key={p.id} className='mt-2 p-2 ps-4 pe-4 d-flex justify-content-between align-items-center' style={listStyles}>
                            <h6 style={{ marginBottom: '0' }}>{p.title}</h6>
                            <div className='d-flex align-items-center' style={{ width: '15%' }}>
                                <button
                                    className='btn btn-danger me-2'
                                    onClick={(e) => removeProduct(e, p.id)}
                                >
                                    {t('delete from cart')}
                                </button>
                                <span className='ps-3'>{p.price}</span>
                            </div>
                        </li>
                    </Link>
                ))
            }
        </ul>
  );
};

export default CartList;
