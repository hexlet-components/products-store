import React, { FC } from 'react';
import Container from '../../components/Base/Container';
import ProductInfo from '../../components/Product/ProductInfo';
import { ProductT } from '../../types/product';

interface ProductProps {
    productItem: ProductT;
}

const Product: FC<ProductProps> = ({ productItem }) => {
  const {
    id, images, description, discountPercentage, title, thumbnail, rating, category, price,
  } = productItem;
  console.log(productItem);

  return (
    <>
        <section className='mt-8'>
            <Container>
                <div className='row'>
                    <div className='col-md-6'></div>
                    <ProductInfo
                        category={category}
                        title={title}
                        rating={rating}
                        price={price}
                        discountPercentage={discountPercentage}
                    />
                </div>
            </Container>
        </section>
        <section className='mt-lg-14 mt-8'>
            <Container>
                <div className='row'>
                    <div className='col-md-12'></div>
                </div>
            </Container>
        </section>
    </>

  );
};

export default Product;
