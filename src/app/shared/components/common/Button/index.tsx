import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmit?: true
}

const Button: React.FC<IButtonProps> = ({ children, isSubmit, ...rest }) => {
  return <Container type={isSubmit ? 'submit' : 'button'} {...rest}>{children}</Container>;
};
export default Button;
