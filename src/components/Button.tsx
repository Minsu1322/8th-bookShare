import { ButtonType } from '@/types/button.type';
import React from 'react';

const Button = ({ style, label }: ButtonType) => {
  return <button className={`${style} rounded-full`}>{label}</button>;
};

export default Button;
