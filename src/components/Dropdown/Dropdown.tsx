import React, { FC } from 'react';

interface DropdownProps {
    isExpanded: boolean;
    title: string;
    children: React.ReactNode | React.ReactNode[];
    handleClick: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  isExpanded, title, children, handleClick,
}) => (
        <li className={`nav-item dropdown ${isExpanded ? 'show' : ''}`} onClick={handleClick}>
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded={isExpanded}>
                {title}
            </a>
            <ul className={`dropdown-menu ${isExpanded ? 'show' : ''}`}>
                {children}
            </ul>
        </li>
);

export default Dropdown;
