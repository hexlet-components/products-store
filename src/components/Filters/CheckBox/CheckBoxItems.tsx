import type { FC } from "react";
import { Checkbox } from "@mantine/core";

interface CheckBoxItemsProps {
  item: string;
  isChecked: boolean;
  handleCheck: (item: string) => void;
}

const CheckBoxItems: FC<CheckBoxItemsProps> = ({ item, isChecked, handleCheck }) => (
  <Checkbox
    id={`${item}-check`}
    label={item}
    checked={isChecked}
    onChange={() => handleCheck(item)}
  />
);

export default CheckBoxItems;
