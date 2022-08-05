import React, { FC } from 'react';
import { useTheme } from 'styled-components';

//types
import { TransactionCardProps } from './types';

//styles
import * as S from './styles';

export const TransactionCard: FC<TransactionCardProps> = ({
  type,
  title,
  amount,
  category: {
    name,
    icon,
  },
  date,
}) => {
  const { colors } = useTheme();

  const amountColor = {
    inflow: colors.success.normal,
    outflow: colors.attention.normal,
  }[type];

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Amount color={amountColor}>
        {type === 'outflow' && '- '}{amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={icon} />
          <S.CategoryName>{name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}