import React, { FC } from 'react';

//types
import { ButtonProps } from './types';

//styles
import { Container, Title } from './styles';

export const Button: FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}