import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ProductsT } from '../../types/product';
import { removeFromCart } from '../../store/reducers/cart';
import { CartT } from '../../types/cart';
import { getPriceWithDiscount } from '../../utilities';

interface CartListProps {
    products: ProductsT;
    cart: CartT;
}

const listStyles = { border: '1px solid gray' };

const CartList: FC<CartListProps> = ({ products, cart }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault();

    dispatch(removeFromCart(id));
  };

  const getPrice = (price: number, disacount: number, count: number) => (getPriceWithDiscount(price, disacount) * count)
    .toFixed(2);

  return (
        <div>
            {
                products.map((p) => (
                    <Link to={`/products/${p.id}`} className='text-decoration-none'>
                        <div
                            key={p.id}
                            className='mt-2 p-2 ps-4 col-12 pe-4 d-flex justify-content-between align-items-center'
                            style={listStyles}
                        >
                            <div className='col-4 d-flex align-items-center'>
                                <h6 className='me-3' style={{ marginBottom: '0' }}>{p.title}</h6>
                            </div>
                            <div className='col-1'>{p.stock} {t('quantity')}</div>
                            <div className='col-1'>{cart[p.id].quantity}</div>
                            <div className='col-1 text-decoration-line-through me-3'>{p.price}$</div>
                            <button
                                className='btn btn-danger me-1'
                                onClick={(e) => removeProduct(e, p.id)}
                            >
                                {t('delete from cart')}
                            </button>
                            <span className='ps-3'>
                                {getPrice(p.price, p.discountPercentage, cart[p.id].quantity)}$
                            </span>
                        </div>
                    </Link>
                ))
            }
        </div>
  );
};

export default CartList;
