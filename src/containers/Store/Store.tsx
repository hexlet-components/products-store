import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../components/Base/Container';
import Product from '../../components/ProductCard/ProductCard';
import { selectStore } from '../../store/selectors';
import { ProductT } from '../../types/product';

const Store = () => {
  const products = useSelector(selectStore);

  return (
    <Container>
      <div className='row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2'>
        {
          products.map((p: ProductT) => (
              <Product
                  key={p.id}
                  id={p.id}
                  thumbnail={p.thumbnail}
                  price={p.price}
                  title={p.title}
                  description={p.description}
              />
          ))
        }
      </div>
    </Container>
  );
};

export default Store;
