import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

//components
import { SignInButton } from '../../components/SignInButton/SignInButton';

//assets
import GoogleIcon from '../../assets/google.svg';
import AppleIcon from '../../assets/apple.svg';
import LogoImage from '../../assets/logo.svg';

//styles
import * as S from './styles';

export const SignIn = () => {
  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoImage width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas finanças de forma muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.SignInButtons>
          <SignInButton text='Entrar com Google' icon={GoogleIcon} />
          <SignInButton text='Entrar com Apple' icon={AppleIcon} />
        </S.SignInButtons>
      </S.Footer>
    </S.Container>
  );
}