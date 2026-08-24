import type React from "react";
import type { FC } from "react";
import { Container as MantineContainer } from "@mantine/core";

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  styles?: string;
}

const Container: FC<ContainerProps> = ({ children, styles }) => (
  <MantineContainer size="xl" className={styles || ""}>
    {children}
  </MantineContainer>
);

export default Container;
