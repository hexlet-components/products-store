import type React from "react";
import { type FC, useState } from "react";

interface DropdownProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

const Dropdown: FC<DropdownProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropDown = () => setIsExpanded((p) => !p);
  return (
    // Обработчик переехал с обёртки на саму кнопку. Раньше onClick висел на
    // <div>, а роль кнопки изображал <span role="button">: с клавиатуры
    // выпадающий список не открывался, потому что фокус на div не попадает и
    // обработчика клавиш не было.
    <div className={`nav-item dropdown ${isExpanded ? "show" : ""}`}>
      <button
        className="nav-link dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded={isExpanded}
        onClick={toggleDropDown}
      >
        {title}
      </button>

      <ul className={`dropdown-menu ${isExpanded ? "show" : ""}`}>{children}</ul>
    </div>
  );
};

export default Dropdown;
