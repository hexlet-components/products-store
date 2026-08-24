import type { FC } from "react";
import { Button, Divider, Grid, Group, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { getPriceWithDiscount } from "../../utilities";

interface ProductInfoProps {
  category: string;
  title: string;
  rating: number;
  price: number;
  stock: number;
  discountPercentage: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

const ProductInfo: FC<ProductInfoProps> = ({
  category,
  title,
  rating,
  price,
  discountPercentage,
  stock,
  addToCart,
}) => {
  const { t } = useTranslation();

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      {/* Не ссылка: переход по категории не реализован, а href="#" уводит
          в начало страницы и объявляет скринридеру ссылку в никуда. */}
      <Text mb="md">#{category}</Text>

      <Title order={1} mb="xs">
        {title}
      </Title>

      <Text mb="md">
        {t(($) => $.rating)}: {rating} &#9733;
      </Text>

      <Group gap="xs" align="baseline">
        <Text size="xl" td="line-through">
          {price}$
        </Text>

        <Text size="xl" fw={700}>
          {getPriceWithDiscount(price, discountPercentage).toFixed(2)}$
        </Text>

        <Text size="sm" c="red">
          {discountPercentage}% Off
        </Text>
      </Group>

      <Divider my="lg" />

      <Group gap="lg">
        <Text>{stock}</Text>

        <Button type="button" onClick={addToCart}>
          {t(($) => $.add)}
        </Button>
      </Group>
    </Grid.Col>
  );
};

export default ProductInfo;
