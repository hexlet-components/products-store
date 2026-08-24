import { Center, Image, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

// Страница показывается, когда запрос списка товаров не удался.
const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Center py="xl">
      <Stack align="center" gap="sm">
        <Image
          alt={t(($) => $.notFound.header)}
          h={200}
          w="auto"
          src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
        />

        <Title order={1} size="h4" c="dimmed">
          {t(($) => $.notFound.header)}
        </Title>

        <Text c="dimmed">{t(($) => $.notFound.message)}</Text>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
