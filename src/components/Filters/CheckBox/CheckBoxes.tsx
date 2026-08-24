import type React from "react";
import type { FC } from "react";
import { Stack, Text } from "@mantine/core";

interface CheckBoxesProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

const CheckBoxes: FC<CheckBoxesProps> = ({ title, children }) => (
  <Stack gap="xs" mt="md" pb="md">
    <Text fw={600}>{title}</Text>

    {children}
  </Stack>
);

export default CheckBoxes;
