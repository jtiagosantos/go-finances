import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

//components
import { Input } from '../Input/Input';

//types
import { ControlledInputProps } from './types';

//styles
import { Container } from './styles';

export const ControlledInput: FC<ControlledInputProps> = ({
  control,
  name,
  ...rest
}) => {
  return (
    <Container>
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
    </Container>
  );
}