import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    handleNext: () => void;
    handlePrev: () => void;
    styles?: string;
}

const Pagination: FC<PaginationProps> = ({ handleNext, handlePrev, styles }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles}>
        <ul className='pagination justify-content-center'>
            <li className='page-item' onClick={handlePrev}>
                <Link className='page-link' to='#'>{t('prev')}</Link>
            </li>
            <li className='page-item' onClick={handleNext}>
                <Link className='page-link' to='#'>{t('next')}</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Pagination;
