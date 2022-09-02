import React from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

//components
import { SignInButton } from '../../components/SignInButton/SignInButton';

//hooks
import { useAuthDispatch } from '../../hooks/auth/useAuthDispatch';

//assets
import GoogleIcon from '../../assets/google.svg';
import AppleIcon from '../../assets/apple.svg';
import LogoImage from '../../assets/logo.svg';

//styles
import * as S from './styles';

export const SignIn = () => {
  const deviceIsIOS = Platform.OS === 'ios';

  const { signInWithGoogle, signInWithApple } = useAuthDispatch();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível entrar com Google');
    }
  }

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível entrar com Google');
    }
  }

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
          <SignInButton 
            text='Entrar com Google' 
            icon={GoogleIcon} 
            onPress={handleSignInWithGoogle}
          />
          {deviceIsIOS && (
            <SignInButton 
              text='Entrar com Apple' 
              icon={AppleIcon} 
              onPress={handleSignInWithApple}
            />
          )}
        </S.SignInButtons>
      </S.Footer>
    </S.Container>
  );
}