import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Base/Container';
import PageContent from '../../components/Base/PageContent';
import { clearCart } from '../../store/reducers/cart';
import { selectCart } from '../../store/selectors';
import { ProductT } from '../../types/product';
import CartList from '../../components/CartList/CartList';

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector(selectCart);

  const handleClearCart = () => dispatch(clearCart());

  const getTotalPrice = () => products.reduce((acc: number, prod: ProductT) => acc + prod.price, 0);

  return (
    <PageContent>
        <section className='pb-4 mb-5 pt-5'>
            <Container>
                <div className='d-flex p-2 align-items-center justify-content-around'>
                    <div>
                        <button onClick={handleClearCart} className='btn btn-danger me-2'>{t('clear')}</button>
                        <Link to={'/'} className='btn btn-secondary'>{t('continue')}</Link>
                    </div>
                    <span className='h5'>{t('total')}: {getTotalPrice()} $</span>
                </div>
            </Container>
        </section>
        <section className='pb-4 mb-5 pt-5'>
            <Container>
                <div className='row'>
                    <CartList products={products} />
                </div>
            </Container>
        </section>
    </PageContent>
  );
};

export default Cart;
