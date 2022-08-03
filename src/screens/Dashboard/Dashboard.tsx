import React, { FC } from 'react';

//components
import { Card } from '../../components/Card/Card';
import { TransactionCard } from '../../components/TransactionCard/TransactionCard';

//types
import { DataListProps } from './types';

//styles
import * as S from './styles';

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'inflow',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '13/04/2020',
    },
    {
      id: '2',
      type: 'outflow',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: '10/04/2020',
    },
    {
      id: '3',
      type: 'outflow',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'home',
      },
      date: '13/04/2020',
    }
  ];

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

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionList 
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard {...item} />
          )}
        />

      </S.Transactions>
    </S.Container>
  );
}