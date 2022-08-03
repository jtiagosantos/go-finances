import React, { FC } from 'react';

//types
import { HeaderProps } from './types';

//styles
import { Container, Title } from './styles';

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}