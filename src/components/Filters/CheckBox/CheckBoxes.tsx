import React, { FC } from 'react';

interface CheckBoxesProps {
    title: string;
    children: React.ReactNode | React.ReactNode[];
}

const CheckBoxes: FC<CheckBoxesProps> = ({ title, children }) => (
    <div className='mt-3 pb-3'>
        <span className='h6'>{title}</span>
        { children }
    </div>
);

export default CheckBoxes;
