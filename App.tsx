import React from 'react';
import { StatusBar } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

//routes
import { AppRoutes } from './src/routes';
import { SignIn } from './src/screens/SignIn/SignIn';

//providers
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './src/contexts/auth/AuthProvider';

//styles
import { theme } from './src/styles/theme';

export const App = () => {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
};