import React, {useState} from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

//components
import { SignInButton } from '../../components/SignInButton/SignInButton';
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading';

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
  const [isSigning, setIsSignin] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      setIsSignin(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível entrar com Google');
    } finally {
      setIsSignin(false);
    }
  }

  const handleSignInWithApple = async () => {
    try {
      setIsSignin(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível entrar com Google');
    } finally {
      setIsSignin(false);
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

        {isSigning && <SpinnerLoading style={{ marginTop: 24 }} />}
      </S.Footer>
    </S.Container>
  );
}