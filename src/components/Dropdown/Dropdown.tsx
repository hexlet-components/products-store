import type React from "react";
import { type FC, useState } from "react";
import { Paper, UnstyledButton } from "@mantine/core";

interface DropdownProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

// Список собран руками, а не на Menu из Mantine: у Menu своя логика закрытия по
// клику вне и по Escape, и подмена изменила бы поведение приложения. Здесь
// меняется только оформление.
const Dropdown: FC<DropdownProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropDown = () => setIsExpanded((p) => !p);

  return (
    <div style={{ position: "relative" }}>
      <UnstyledButton
        type="button"
        aria-expanded={isExpanded}
        onClick={toggleDropDown}
        px="sm"
        py="xs"
      >
        {title}
      </UnstyledButton>

      {isExpanded ? (
        <Paper
          component="ul"
          withBorder
          shadow="sm"
          p="xs"
          style={{ position: "absolute", zIndex: 10, listStyle: "none", minWidth: 180 }}
        >
          {children}
        </Paper>
      ) : (
        <ul style={{ display: "none" }}>{children}</ul>
      )}
    </div>
  );
};

export default Dropdown;
