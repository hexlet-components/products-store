import React, { FC, useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchProps {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ input, setInput }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  return (
    <input className='mb-3 w-100' type='text' value={input} placeholder={t('search') || ''} onChange={handleChange}/>
  );
};

export default Search;
