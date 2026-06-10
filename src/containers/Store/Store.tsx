import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Base/Container';
import PageContent from '../../components/Base/PageContent';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import { addToCart } from '../../store/reducers/cart';
import { nextPage, prevPage } from '../../store/reducers/store';
import {
  selectLimit,
  selectSkip,
  selectStore,
  selectTotal,
} from '../../store/selectors';
import type { ProductsT, ProductT } from '../../types/product';
import SideBar from '../SideBar/SideBar';

const Store = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const products = useSelector(selectStore);
  const skip = useSelector(selectSkip);
  const limit = useSelector(selectLimit);
  const total = useSelector(selectTotal);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleNext = () => (limit + skip < total ? dispatch(nextPage()) : null);
  const handlePrev = () => (skip - limit >= 0 ? dispatch(prevPage()) : null);

  const addProductToCart = (product: ProductT) => dispatch(addToCart(product));

  const changeFilteredProducts = useCallback(
    (filtered: ProductsT) => setFilteredProducts(filtered),
    [],
  );

  return (
    <PageContent>
      <Container styles="row">
        <SideBar
          products={products}
          changeFilteredProducts={changeFilteredProducts}
        />

        <div className="col pt-5">
          <Pagination handleNext={handleNext} handlePrev={handlePrev} />

          <div className="row g-4 row-cols-xl-3 row-cols-lg-2 row-cols-1 row-cols-md-1 mb-4">
            {filteredProducts.length ? (
              filteredProducts.map((p: ProductT) => (
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
              ))
            ) : (
              <span>{t('Nothing found')}</span>
            )}
          </div>

          <Pagination
            handleNext={handleNext}
            handlePrev={handlePrev}
            styles="mb-5"
          />
        </div>
      </Container>
    </PageContent>
  );
};

export default Store;
