import type { FC } from "react";
import { Button, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  handleNext: () => void;
  handlePrev: () => void;
  styles?: string;
}

const Pagination: FC<PaginationProps> = ({ handleNext, handlePrev, styles }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles}>
      {/* Кнопки, а не ссылки на "#": страница не меняет адрес, переключение
          делает обработчик. */}
      <Group justify="center" gap="xs">
        <Button variant="default" type="button" onClick={handlePrev}>
          {t(($) => $.prev)}
        </Button>

        <Button variant="default" type="button" onClick={handleNext}>
          {t(($) => $.next)}
        </Button>
      </Group>
    </nav>
  );
};

export default Pagination;
