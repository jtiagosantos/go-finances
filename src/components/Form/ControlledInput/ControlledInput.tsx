import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

//components
import { Input } from '../Input/Input';

//types
import { ControlledInputProps } from './types';

//styles
import * as S from './styles';

export const ControlledInput: FC<ControlledInputProps> = ({
  control,
  name,
  error,
  ...rest
}) => {
  return (
    <S.Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input 
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {!!error && (
        <S.Error>
          <S.Icon name="alert-circle" />
          <S.TextError>{error}</S.TextError>
        </S.Error>
      )}
    </S.Container>
  );
}