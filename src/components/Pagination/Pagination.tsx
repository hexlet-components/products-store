import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    handleNext: () => void;
    handlePrev: () => void;
    styles?: string;
    currentPage: number,
    pagesCount: number,
}

const Pagination: FC<PaginationProps> = ({ handleNext, handlePrev, styles, currentPage, pagesCount }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles}>
        <ul className='pagination justify-content-center'>
            {currentPage > 1 && <li className='page-item' onClick={handlePrev}>
                <button className='page-link'>{t('prev')}</button>
            </li>}
            {currentPage < pagesCount && <li className='page-item' onClick={handleNext}>
                <button className='page-link'>{t('next')}</button>
            </li>}
        </ul>
    </nav>
  );
};

export default Pagination;
