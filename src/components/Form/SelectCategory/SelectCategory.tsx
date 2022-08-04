import React, { FC } from 'react';

//types
import { SelectCategoryProps } from './types';

//styles
import { Container, Category, Icon } from './styles';

export const SelectCategory: FC<SelectCategoryProps> = ({ 
  title, 
  ...rest 
}) => {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}