import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '../../components/Base/Container';
import PageContent from '../../components/Base/PageContent';
import { clearCart } from '../../store/reducers/cart';
import { selectCart } from '../../store/selectors';
import { ProductT } from '../../types/product';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectCart);

  const handleClearCart = () => dispatch(clearCart());

  const getTotalPrice = () => products.reduce((acc: number, prod: ProductT) => acc + prod.price, 0);

  console.log(products);

  return (
    <PageContent>
        <Container>
            <section className='pt-4 pb-4'>
                <div className='d-flex p-2 align-items-center justify-content-around'>
                    <div>
                        <button onClick={handleClearCart} className='btn btn-danger me-2'>Clear cart</button>
                        <Link to={'/'} className='btn btn-secondary'>Continue shopping</Link>
                    </div>
                    <span className='h5'>Total: {getTotalPrice()} $</span>
                </div>
            </section>
        </Container>
    </PageContent>
  );
};

export default Cart;
