import React, { FC } from 'react';

//types
import {HistoricListItemProps} from './types';

//styles
import { Container, Title, Amount } from './styles';

export const HistoricListItem: FC<HistoricListItemProps> = ({
  color,
  title,
  amount,
}) => {
  return (
    <Container flagColor={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}