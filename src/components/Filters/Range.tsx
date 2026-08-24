import type React from "react";
import type { FC } from "react";
import { Group, Stack, Text, TextInput } from "@mantine/core";

interface RangeProps {
  minPriceRange: string;
  maxPriceRange: string;
  title: string;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  text: string;
  minValue: string;
  maxValue: string;
}

const Range: FC<RangeProps> = ({
  minPriceRange,
  maxPriceRange,
  title,
  handleMinChange,
  handleMaxChange,
  minValue,
  maxValue,
  text,
}) => (
  <Stack gap="xs" mb="xl">
    <Text component="label" htmlFor="priceRange" fw={600}>
      {title}
    </Text>

    <Group gap="xs" wrap="nowrap">
      <Text size="sm" c="dimmed">
        {text}
      </Text>

      <TextInput
        type="number"
        min={0}
        value={minValue}
        placeholder={minPriceRange}
        onChange={handleMinChange}
      />

      <TextInput
        type="number"
        value={maxValue}
        placeholder={maxPriceRange}
        max={maxPriceRange}
        onChange={handleMaxChange}
      />
    </Group>
  </Stack>
);

export default Range;
