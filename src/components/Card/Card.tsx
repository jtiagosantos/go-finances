import React, { FC } from 'react';

//types
import { CardProps } from './types';

//styles
import * as S from './styles';
import { useTheme } from '../../hooks/useTheme';

export const Card: FC<CardProps> = ({ 
  type,
  title, 
  amount, 
  lastTransaction, 
}) => {
  const { colors } = useTheme();

  const iconNamePerType = {
    inflow: 'arrow-up-circle',
    outflow: 'arrow-down-circle',
    total: 'dollar-sign',
  };

  const iconColorPerType = {
    inflow: colors.success.normal,
    outflow: colors.attention.normal,
    total: colors.shape,
  }

  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon 
          name={iconNamePerType[type]} 
          color={iconColorPerType[type]}
        />
      </S.Header>

      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>
        <S.LastTransaction type={type}>
          {lastTransaction}
        </S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}