import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
    handleNext: () => void;
    handlePrev: () => void;
    styles?: string;
}

const Pagination: FC<PaginationProps> = ({ handleNext, handlePrev, styles }) => (
    <nav className={styles}>
        <ul className='pagination justify-content-center'>
            <li className='page-item' onClick={handlePrev}>
                <Link className='page-link' to='#'>Previous</Link>
            </li>
            <li className='page-item' onClick={handleNext}>
                <Link className='page-link' to='#'>Next</Link>
            </li>
        </ul>
    </nav>
);

export default Pagination;
