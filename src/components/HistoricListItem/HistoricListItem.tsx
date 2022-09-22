import React, { FC } from 'react';
import { MotiView } from 'moti';

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
    <MotiView
      from={{
        opacity: 0,
        transform: [
          {translateY: 50},
        ],
      }}
      animate={{
        opacity: 1,
        transform: [
          {translateY: 0},
        ],
      }}
      transition={{
        type: 'timing',
        duration: 600,
      }}
    >
      <Container flagColor={color}>
        <Title>{title}</Title>
        <Amount>{amount}</Amount>
      </Container>
    </MotiView>
  );
}