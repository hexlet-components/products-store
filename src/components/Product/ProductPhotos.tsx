import { type FC, Fragment, useState } from "react";
import { Grid, Group, Image, UnstyledButton } from "@mantine/core";

interface ProductPhotosProps {
  images: string[];
  thumbnail: string;
}

const ProductPhotos: FC<ProductPhotosProps> = ({ images, thumbnail }) => {
  // Превью переключают основную картинку: без этого они были просто рядом
  // лежащими изображениями.
  const [selectedPhoto, setSelectedPhoto] = useState(thumbnail);

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Image src={selectedPhoto} alt="card 1" radius="md" mb="md" mah={400} fit="contain" />

      <Group gap="xs">
        {images.map((image, ind) =>
          ind < images.length - 1 ? (
            <UnstyledButton key={image} type="button" onClick={() => setSelectedPhoto(image)}>
              <Image src={image} alt={`card ${ind}`} radius="md" w={120} h={65} fit="contain" />
            </UnstyledButton>
          ) : (
            <Fragment key={ind} />
          ),
        )}
      </Group>
    </Grid.Col>
  );
};

export default ProductPhotos;
