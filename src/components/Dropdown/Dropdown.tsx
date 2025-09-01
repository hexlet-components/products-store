import React, { FC, useState } from 'react'

interface DropdownProps {
  title: string
  children: React.ReactNode | React.ReactNode[]
}

const Dropdown: FC<DropdownProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDropDown = () => setIsExpanded(p => !p)
  return (
    <div
      className={`nav-item dropdown ${isExpanded ? 'show' : ''}`}
      onClick={toggleDropDown}
    >
      <span
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded={isExpanded}
      >
        {title}
      </span>

      <ul className={`dropdown-menu ${isExpanded ? 'show' : ''}`}>
        {children}
      </ul>
    </div>
  )
}

export default Dropdown
