import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Base/Container';
import { nextPage, prevPage } from '../../store/reducers/store';
import PageContent from '../../components/Base/PageContent';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import { selectCart, selectLimit, selectSkip, selectStore, selectTotal } from '../../store/selectors';
import { ProductT } from '../../types/product';
import { addToCart } from '../../store/reducers/cart';
import { isInCart } from '../../utilities';

const Store = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(selectCart);
  const products = useSelector(selectStore);
  const skip = useSelector(selectSkip);
  const limit = useSelector(selectLimit);
  const total = useSelector(selectTotal);

  const handleNext = () => (limit + skip < total ? dispatch(nextPage()) : null);
  const handlePrev = () => (skip - limit >= 0 ? dispatch(prevPage()) : null);

  const addProductToCart = (product: ProductT) => dispatch(addToCart(product));

  return (
    <PageContent>
      <Container>
        <Pagination handleNext={handleNext} handlePrev={handlePrev} styles='mt-5' />
        <div className='row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mb-4'>
          {
            products.map((p: ProductT) => (
              <ProductCard
                key={p.id}
                id={p.id}
                thumbnail={p.thumbnail}
                price={p.price}
                title={p.title}
                description={p.description}
                isInCart={isInCart(p.id, cartProducts)}
                addToCart={() => addProductToCart(p)}
              />
            ))
          }
        </div>
        <Pagination handleNext={handleNext} handlePrev={handlePrev} styles='mb-5' />
      </Container>
    </PageContent>
  );
};

export default Store;
