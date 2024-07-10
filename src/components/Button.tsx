import { ButtonType } from '@/types/button.type';
import React from 'react';

const Button = ({ style, label, onClick }: ButtonType) => {
  return (
    <button className={`${style} rounded-full`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
