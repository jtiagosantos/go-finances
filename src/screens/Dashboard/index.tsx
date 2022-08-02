import React from 'react';

//components
import { Card } from '../../components/Card/Card';

//styles
import * as S from './styles';

export const Dashboard = () => {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo source={{ uri: 'https://github.com/jtiagosantos.png' }} />
            <S.User>
              <S.Greeting>Olá, </S.Greeting>
              <S.UserName>Tiago</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

      <S.Cards>
        <Card 
          type='inflow'
          title='Entradas' 
          amount='R$ 17.400,00' 
          lastTransaction='Última entrada dia 13 de abril'  
        />
        <Card 
          type='outflow'
          title='Saídas' 
          amount='R$ 1.259,00' 
          lastTransaction='Última saída dia 03 de abril' 
        />
        <Card 
          type='total'
          title='Total' 
          amount='R$ 16.141,00' 
          lastTransaction='01 à 16 de abril' 
        />
      </S.Cards>
    </S.Container>
  );
}