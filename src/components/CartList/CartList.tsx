import type React from "react";
import type { FC } from "react";
import { Button, Group, Paper, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRemoveFromCart } from "../../store/cart";
import type { CartT } from "../../types/cart";
import type { ProductsT } from "../../types/product";
import { getPriceWithDiscount } from "../../utilities";

interface CartListProps {
  products: ProductsT;
  cart: CartT;
}

const CartList: FC<CartListProps> = ({ products, cart }) => {
  const { t } = useTranslation();
  const removeFromCart = useRemoveFromCart();

  const removeProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault();

    removeFromCart(id);
  };

  const getPrice = (price: number, disacount: number, count: number) =>
    (getPriceWithDiscount(price, disacount) * count).toFixed(2);

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, width: "100%" }}>
      {products.map((p) => (
        <Link
          key={p.id}
          to={`/products/${p.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Paper component="li" withBorder mt="xs" px="lg" py="sm">
            <Group justify="space-between" align="center" wrap="wrap">
              <Group align="center" gap="md">
                <Text fw={600}>{p.title}</Text>

                <Text>
                  {p.stock} {t(($) => $.quantity)}
                </Text>
              </Group>

              <Text>{cart[p.id].quantity}</Text>

              <Group align="center" justify="space-between" gap="md" miw="25%">
                <Text td="line-through">{p.price}$</Text>

                <Button type="button" color="red" onClick={(e) => removeProduct(e, p.id)}>
                  {t(($) => $["delete from cart"])}
                </Button>

                <Text>{getPrice(p.price, p.discountPercentage, cart[p.id].quantity)}$</Text>
              </Group>
            </Group>
          </Paper>
        </Link>
      ))}
    </ul>
  );
};

export default CartList;
