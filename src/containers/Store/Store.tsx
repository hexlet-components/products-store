import { type FC, useCallback, useMemo, useState } from "react";
import { Grid, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Container from "../../components/Base/Container";
import PageContent from "../../components/Base/PageContent";
import Pagination from "../../components/Pagination/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAddToCart } from "../../store/cart";
import { pageSize, useCurrentPage, useNextPage, usePrevPage } from "../../store/pagination";
import type { DummyStoreResponseT } from "../../types/dummyStoreResponse";
import type { ProductsT, ProductT } from "../../types/product";
import SideBar from "../SideBar/SideBar";

interface StoreProps {
  store: DummyStoreResponseT;
}

const Store: FC<StoreProps> = ({ store }) => {
  const { t } = useTranslation();

  const { products, total } = store;
  const currentPage = useCurrentPage();
  const nextPage = useNextPage();
  const prevPage = usePrevPage();
  const addToCart = useAddToCart();

  const [filteredProducts, setFilteredProducts] = useState<ProductsT>(products);

  // Последняя страница определяется по числу товаров: если их меньше страницы,
  // страница одна.
  const pagesCount = filteredProducts.length < pageSize ? 1 : Math.ceil(total / pageSize);

  const handleNext = () => (currentPage < pagesCount ? nextPage() : null);
  const handlePrev = () => (currentPage > 1 ? prevPage() : null);

  const changeFilteredProducts = useCallback(
    (filtered: ProductsT) => setFilteredProducts(filtered),
    [],
  );

  const memoProducts = useMemo(() => products, [products]);

  return (
    <PageContent>
      <Container>
        <Grid pt="xl" gap="xl">
          <Grid.Col span={{ base: 12, md: 3 }} order={{ base: 2, md: 1 }}>
            <SideBar products={memoProducts} changeFilteredProducts={changeFilteredProducts} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }} order={{ base: 1, md: 2 }}>
            <Pagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              currentPage={currentPage}
              pagesCount={pagesCount}
            />

            <Grid mt="md" mb="md" gap="md">
              {filteredProducts.length ? (
                filteredProducts.map((p: ProductT) => (
                  <Grid.Col span={{ base: 12, md: 6, xl: 4 }} key={p.id}>
                    <ProductCard
                      id={p.id}
                      thumbnail={p.thumbnail}
                      price={p.price}
                      title={p.title}
                      description={p.description}
                      discountPercentage={p.discountPercentage}
                      stock={p.stock}
                      addToCart={() => addToCart(p)}
                    />
                  </Grid.Col>
                ))
              ) : (
                <Grid.Col span={12}>
                  <Text>{t(($) => $["Nothing found"])}</Text>
                </Grid.Col>
              )}
            </Grid>

            <Pagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              currentPage={currentPage}
              pagesCount={pagesCount}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </PageContent>
  );
};

export default Store;
