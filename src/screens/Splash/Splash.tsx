import React from 'react';
import { StatusBar } from 'react-native';

//assets
import LogoImage from '../../assets/logo.svg';

//styles
import { Container } from './styles'

export const Splash = () => {
  return (
    <>
      <StatusBar 
        barStyle='dark-content'
        translucent
      />

      <Container>
        <LogoImage width={160} height={108} />
      </Container>
    </>
  );
}