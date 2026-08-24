import type { FC } from "react";
import { Group, Paper, Text } from "@mantine/core";
import type { CartT } from "../../types/cart";
import type { ProductsT } from "../../types/product";
import { getPriceWithDiscount } from "../../utilities";

interface CartListProps {
  products: ProductsT;
  cart: CartT;
}

const CartListShort: FC<CartListProps> = ({ products, cart }) => {
  const getPrice = (price: number, disacount: number, count: number) =>
    (getPriceWithDiscount(price, disacount) * count).toFixed(2);

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: "0.5rem" }}>
      {products.map((p) => (
        <Paper component="li" key={p.id} withBorder mt="xs" px="lg" py="sm">
          <Group justify="space-between" align="center">
            <Text fw={600}>{p.title}</Text>
            <Text>{cart[p.id].quantity}</Text>
            <Text>{getPrice(p.price, p.discountPercentage, cart[p.id].quantity)}$</Text>
          </Group>
        </Paper>
      ))}
    </ul>
  );
};

export default CartListShort;
