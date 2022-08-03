import React, { FC } from 'react';
import { TextInputProps } from 'react-native';

//styles
import { Container } from './styles';

export const Input: FC<TextInputProps> = ({ ...rest }) => {
  return (
    <Container {...rest} />
  );
}