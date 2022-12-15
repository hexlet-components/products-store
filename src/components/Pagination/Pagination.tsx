import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    handleNext: () => void;
    handlePrev: () => void;
    styles?: string;
    currentPage: number,
    pagesCount: number,
}

const Pagination: FC<PaginationProps> = ({ handleNext, handlePrev, currentPage, pagesCount }) => {
  const { t } = useTranslation();

  return (
    <nav className='mb-5'>
        <ul className='pagination justify-content-center'>
            {currentPage > 1 && <li className='page-item' onClick={handlePrev}>
                <Link className='page-link' to='#'>{t('prev')}</Link>
            </li>}
            {currentPage < pagesCount && <li className='page-item' onClick={handleNext}>
                <Link className='page-link' to='#'>{t('next')}</Link>
            </li>}
        </ul>
    </nav>
  );
};

export default Pagination;
