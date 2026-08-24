import type { FC } from "react";
import { Grid, Text, Title } from "@mantine/core";
import Container from "../../components/Base/Container";
import PageContent from "../../components/Base/PageContent";
import ProductInfo from "../../components/Product/ProductInfo";
import ProductPhotos from "../../components/Product/ProductPhotos";
import { useAddToCart, useRemoveFromCart } from "../../store/cart";
import type { ProductT } from "../../types/product";

interface ProductProps {
  productItem: ProductT;
}

const Product: FC<ProductProps> = ({ productItem }) => {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const {
    id,
    images,
    description,
    discountPercentage,
    title,
    thumbnail,
    rating,
    category,
    price,
    stock,
  } = productItem;

  const addProductToCart = () => addToCart(productItem);
  const removeProductFromCart = () => removeFromCart(id);

  return (
    <PageContent>
      <section style={{ padding: "2rem 0" }}>
        <Container>
          <Grid gutter="xl">
            <ProductPhotos images={images} thumbnail={thumbnail} />

            <ProductInfo
              category={category}
              title={title}
              rating={rating}
              price={price}
              discountPercentage={discountPercentage}
              addToCart={addProductToCart}
              stock={stock}
              removeFromCart={removeProductFromCart}
            />
          </Grid>
        </Container>
      </section>

      <section style={{ paddingBottom: "2rem" }}>
        <Container>
          <Title order={2} size="h4" mb="sm">
            Description
          </Title>

          <Text>{description}</Text>
        </Container>
      </section>
    </PageContent>
  );
};

export default Product;
