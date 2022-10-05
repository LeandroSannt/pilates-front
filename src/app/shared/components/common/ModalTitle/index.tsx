import React, { ReactNode } from 'react';
import { Container, Label } from './styles';

interface IModalTitleProps {
  icon: ReactNode;
  title: string;
}
const ModalTitle: React.FC<IModalTitleProps> = ({ icon, title }) => {
  return (
    <Container>
      {icon}
      <Label>{title}</Label>
    </Container>
  );
};

export { ModalTitle };
