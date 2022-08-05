import React, { FC } from 'react';
import { useTheme } from 'styled-components';

//types
import { TransactionTypeButtonProps } from './types';

//styles
import * as S from './styles';

export const TransactionTypeButton: FC<TransactionTypeButtonProps> = ({
  type,
  title,
  isSelected,
  ...rest
}) => {
  const { colors } = useTheme();

  const icon = {
    inflow: 'arrow-up-circle',
    outflow: 'arrow-down-circle',
  }[type];

  const color = {
    inflow: colors.success.normal,
    outflow: colors.attention.normal,
  }[type];

  const variantColor = {
    inflow: colors.success.light,
    outflow: colors.attention.light,
  }[type];

  return (
    <S.Container 
      isSelected={isSelected} 
      variantColor={variantColor}
      {...rest}
    >
      <S.Icon name={icon} color={color} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}