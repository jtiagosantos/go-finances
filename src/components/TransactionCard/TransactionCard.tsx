import React, { FC } from 'react';
import { useTheme } from 'styled-components';

//types
import { TransactionCardProps } from './types';

//utils 
import { categories } from '../../utils/categories';

//styles
import * as S from './styles';

export const TransactionCard: FC<TransactionCardProps> = ({
  transactionType,
  name,
  amount,
  category,
  date,
}) => {
  const { colors } = useTheme();
  const [categoryData] = categories.filter((i) => i.key === category);

  const amountColor = {
    inflow: colors.success.normal,
    outflow: colors.attention.normal,
  }[transactionType];

  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      <S.Amount color={amountColor}>
        {transactionType === 'outflow' && '- '}{amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={categoryData.icon} />
          <S.CategoryName>{categoryData.name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}