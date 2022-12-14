import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Base/Container';
import { nextPage, prevPage } from '../../store/reducers/store';
import PageContent from '../../components/Base/PageContent';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import { selectCurrentPage, selectLimit, selectSkip, selectStore, selectTotal } from '../../store/selectors';
import { ProductsT, ProductT } from '../../types/product';
import { addToCart } from '../../store/reducers/cart';
import SideBar from '../SideBar/SideBar';

const Store = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const products = useSelector(selectStore);
  const skip = useSelector(selectSkip);
  const limit = useSelector(selectLimit);
  const total = useSelector(selectTotal);
  const currentPage = useSelector(selectCurrentPage);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const pagesCount = filteredProducts.length < 30 ? 1 : Math.ceil(total / 30);

  const handleNext = () => {
    if (currentPage < pagesCount) {
      dispatch(nextPage());
      // setFilteredProducts(products);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(prevPage());
    }
  };

  const addProductToCart = (product: ProductT) => dispatch(addToCart(product));

  const changeFilteredProducts = (filtered: ProductsT) => setFilteredProducts(filtered);

  return (
    <PageContent>
      <Container styles='row'>
        <SideBar products={products} changeFilteredProducts={changeFilteredProducts} />
        <div className='col pt-5'>
          <Pagination handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage} pagesCount={pagesCount} />
          <div className='row g-4 row-cols-xl-3 row-cols-lg-2 row-cols-1 row-cols-md-1 mb-4'>
            {
              filteredProducts.length ? filteredProducts.map((p: ProductT) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  thumbnail={p.thumbnail}
                  price={p.price}
                  title={p.title}
                  description={p.description}
                  discountPercentage={p.discountPercentage}
                  stock={p.stock}
                  addToCart={() => addProductToCart(p)}
                />
              )) : <span>{t('Nothing found')}</span>
            }
          </div>
          <Pagination handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage} pagesCount={pagesCount} styles='mb-5' />
        </div>
      </Container>
    </PageContent>
  );
};

export default Store;
