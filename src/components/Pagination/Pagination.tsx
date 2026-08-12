import type { FC } from "react";
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
      <ul className="pagination justify-content-center">
        {/* Кнопка, а не ссылка на "#": страница не меняет адрес, переключение
            делает обработчик. Раньше onClick висел на <li>, поэтому с
            клавиатуры пагинация была недоступна вовсе: у списка нет фокуса и
            нет обработчика клавиш. */}
        <li className="page-item">
          <button className="page-link" type="button" onClick={handlePrev}>
            {t("prev")}
          </button>
        </li>

        <li className="page-item">
          <button className="page-link" type="button" onClick={handleNext}>
            {t("next")}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
