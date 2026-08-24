import type { FC } from "react";
import { Button, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  handleNext: () => void;
  handlePrev: () => void;
  currentPage: number;
  pagesCount: number;
  styles?: string;
}

const Pagination: FC<PaginationProps> = ({
  handleNext,
  handlePrev,
  currentPage,
  pagesCount,
  styles,
}) => {
  const { t } = useTranslation();

  return (
    <nav className={styles}>
      {/* Кнопки показываются только там, где есть куда идти: на первой странице
          нет «назад», на последней нет «вперёд». */}
      <Group justify="center" gap="xs">
        {currentPage > 1 ? (
          <Button variant="default" type="button" onClick={handlePrev}>
            {t(($) => $.prev)}
          </Button>
        ) : null}

        {currentPage < pagesCount ? (
          <Button variant="default" type="button" onClick={handleNext}>
            {t(($) => $.next)}
          </Button>
        ) : null}
      </Group>
    </nav>
  );
};

export default Pagination;
