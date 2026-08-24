import { type FC, Fragment } from "react";
import { Grid, Group, Image } from "@mantine/core";

interface ProductPhotosProps {
  images: string[];
  thumbnail: string;
}

const ProductPhotos: FC<ProductPhotosProps> = ({ images, thumbnail }) => (
  <Grid.Col span={{ base: 12, md: 6 }}>
    <Image src={thumbnail} alt="card 1" radius="md" mb="md" mah={400} fit="contain" />

    <Group gap="xs">
      {images.map((image, ind) =>
        ind < images.length - 1 ? (
          <Image key={image} src={image} alt={`card ${ind}`} radius="md" w={80} />
        ) : (
          <Fragment key={ind} />
        ),
      )}
    </Group>
  </Grid.Col>
);

export default ProductPhotos;
