import type React from "react";
import type { FC } from "react";
import { Button, Card, Group, Image, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getPriceWithDiscount } from "../../utilities";

interface ProductCardProps {
  id: number;
  description: string;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
  stock: number;
  addToCart: () => void;
}

const descriptionLength = 201;
const dots = "...";

const ProductCard: FC<ProductCardProps> = ({
  id,
  thumbnail,
  description,
  title,
  price,
  discountPercentage,
  stock,
  addToCart,
}) => {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart();
  };

  const cuttedDescription =
    description.length >= descriptionLength - 1
      ? `${description.substring(0, descriptionLength - dots.length)}${dots}`
      : description;

  return (
    <Link to={`/products/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card withBorder radius="md" h="100%" mah={415}>
        <Card.Section>
          <Image src={thumbnail} alt={title} h={180} fit="cover" />
        </Card.Section>

        <Text fw={600} mt="md">
          {title}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={4}>
          {cuttedDescription}
        </Text>

        <Group justify="space-between" align="center" mt="md">
          <Text td="line-through">{price}$</Text>

          <Text c="red">{getPriceWithDiscount(price, discountPercentage).toFixed(2)}$</Text>

          <Text>{stock}</Text>

          {stock ? (
            <Button type="button" onClick={handleClick}>
              {t(($) => $.add)}
            </Button>
          ) : null}
        </Group>
      </Card>
    </Link>
  );
};

export default ProductCard;
