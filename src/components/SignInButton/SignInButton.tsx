import React, { FC } from 'react';

//types
import { SignInButtonProps } from './types';

//styles
import * as S from './styles';

export const SignInButton: FC<SignInButtonProps> = ({ text, icon: Icon, ...props }) => {
  return (
    <S.Container {...props} activeOpacity={.8}>
      <S.IconContainer>
        <Icon />
      </S.IconContainer>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}