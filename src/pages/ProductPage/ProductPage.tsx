import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FallBack from '../../components/Fallback/FallBack';
import Product from '../../containers/Product/Product';
import { ProductT } from '../../types/product';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductT>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();

      console.log(data);

      setProduct(data);
    };

    fetchProduct();
  }, []);

  return (
    product ? <Product productItem={product}/> : <FallBack />
  );
};

export default ProductPage;
