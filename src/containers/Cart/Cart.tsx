import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Base/Container';
import PageContent from '../../components/Base/PageContent';
import { clearCart } from '../../store/reducers/cart';
import { ProductsT, ProductT } from '../../types/product';
import CartList from '../../components/CartList/CartList';
import { selectCart, selectCartProducts } from '../../store/selectors';
import { CartT } from '../../types/cart';
import { getPriceWithDiscount } from '../../utilities';

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products: ProductsT = useSelector(selectCartProducts);
  const cart: CartT = useSelector(selectCart);

  const handleClearCart = () => dispatch(clearCart());

  const getTotalPrice = () => products
    .reduce((acc: number, p: ProductT) => acc + (getPriceWithDiscount(p.price, p.discountPercentage) * cart[p.id].quantity), 0);

  return (
    <PageContent>
        <section className='pb-4 mb-5 pt-5'>
            <Container>
                <div className='d-flex p-2 align-items-center justify-content-around'>
                    <div>
                        <button onClick={handleClearCart} className='btn btn-danger me-2'>{t('clear')}</button>
                        <Link to={'/'} className='btn btn-secondary'>{t('continue')}</Link>
                    </div>
                    <span className='h5'>{t('total')}: {getTotalPrice().toFixed(2)} $</span>
                </div>
            </Container>
        </section>
        <section className='pb-4 mb-5 pt-5'>
            <Container>
                <div className='row'>
                    <CartList products={products} cart={cart} />
                </div>
            </Container>
        </section>
    </PageContent>
  );
};

export default Cart;
