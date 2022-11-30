import React, { FC } from 'react';

interface CheckBoxItemsProps {
    item: string;
    isChecked: boolean;
    handleCheck: (item: string) => void;
}

const CheckBoxItems: FC<CheckBoxItemsProps> = ({ item, isChecked, handleCheck }) => (
        <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id={`${item}-check`}
                checked={isChecked}
                onChange={() => handleCheck(item)}
              />
              <label className='form-check-label' htmlFor={`${item}-check`}>
                {item}
              </label>
        </div>
);

export default CheckBoxItems;
