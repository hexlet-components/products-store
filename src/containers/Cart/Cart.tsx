import { useEffect, useState } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Container from "../../components/Base/Container";
import PageContent from "../../components/Base/PageContent";
import CartList from "../../components/CartList/CartList";
import CartListShort from "../../components/CartList/CartListShort";
import Modal from "../../components/Modal/Modal";
import { API_BASE } from "../../services/apiConfig";
import { useCart, useClearCart } from "../../store/cart";
import type { CartT } from "../../types/cart";
import type { ProductsT, ProductT } from "../../types/product";
import { getPriceWithDiscount } from "../../utilities";

const Cart = () => {
  const { t } = useTranslation();
  const cart: CartT = useCart();
  const clearCart = useClearCart();
  const products: ProductsT = Object.values(cart).map((p) => p.product);

  const [isOpen, setIsOpen] = useState(false);

  const handleClearCart = () => clearCart();

  const getTotalPrice = () =>
    products.reduce(
      (acc: number, p: ProductT) =>
        acc + getPriceWithDiscount(p.price, p.discountPercentage) * cart[p.id].quantity,
      0,
    );

  const handleClick = () => setIsOpen((prev) => !prev);

  // Заказ создаётся один раз при открытии модалки: cart и total читаются в
  // этот момент, и пересоздавать заказ на каждое их изменение не нужно.
  useEffect(() => {
    if (!isOpen) return;

    const createOrder = async () => {
      try {
        const order = {
          products: Object.values(cart).map(({ product, quantity }) => ({
            id: product.id,
            quantity,
          })),
          total: getTotalPrice(),
        };

        const response = await fetch(`${API_BASE}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    createOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PageContent>
      <Modal isOpen={isOpen} title={t(($) => $.orderPlaced)} closeModal={handleClick}>
        <CartListShort products={products} cart={cart} />

        <Text fw={600} size="lg" p="xs">
          {t(($) => $.total)}: {getTotalPrice().toFixed(2)} $
        </Text>
      </Modal>

      <section style={{ padding: "2rem 0" }}>
        <Container>
          <Group justify="space-around" align="center" p="xs">
            <Group gap="xs">
              <Button type="button" color="red" onClick={handleClearCart}>
                {t(($) => $.clear)}
              </Button>

              <Button component={Link} to="/" variant="default">
                {t(($) => $.continue)}
              </Button>
            </Group>

            <Text fw={600} size="lg">
              {t(($) => $.total)}: {getTotalPrice().toFixed(2)} $
            </Text>
          </Group>
        </Container>
      </section>

      <section style={{ padding: "2rem 0" }}>
        <Container>
          <Stack align="center">
            {Object.keys(cart).length ? (
              <Button type="button" color="green" w="20%" onClick={handleClick}>
                {t(($) => $.buy)}
              </Button>
            ) : null}

            <CartList products={products} cart={cart} />
          </Stack>
        </Container>
      </section>
    </PageContent>
  );
};

export default Cart;
