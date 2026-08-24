import type React from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import { TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface SearchProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ input, setInput }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  return (
    <TextInput
      mb="md"
      type="text"
      value={input}
      placeholder={t(($) => $.search) || ""}
      onChange={handleChange}
    />
  );
};

export default Search;
