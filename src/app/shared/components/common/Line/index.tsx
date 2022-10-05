import React from 'react';
import { Container } from './styles';

interface ILineProps {
  styles: string;
}

const Line: React.FC<ILineProps> = ({ styles }) => {
  return <Container $styles={styles} />;
};

export { Line };
