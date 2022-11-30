import React, { FC } from 'react';

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
    <div className='mb-5'>
        <label htmlFor='priceRange' className='form-label h6'>{title}</label>
        <div className='input-group'>
            <span className='input-group-text'>{text}</span>
            <input
                type='number'
                min={0}
                className='form-control'
                value={minValue}
                placeholder={minPriceRange}
                onChange={handleMinChange}
            />
            <input
                type='number'
                className='form-control'
                value={maxValue}
                placeholder={maxPriceRange}
                max={maxPriceRange}
                onChange={handleMaxChange}
            />
        </div>
    </div>
);

export default Range;
