import React, { FC, useEffect, useState } from 'react';

//components
import { Card } from '../../components/Card/Card';
import { TransactionCard } from '../../components/TransactionCard/TransactionCard';

//hooks
import { useStorage } from '../../hooks/useStorage';

//utils
import { formatTransactions } from '../../utils/formatTransactions';

//constants
import { STORAGE_TRANSACTIONS_KEY } from '../../constants/storage';

//types
import { DataListProps } from './types';

//styles
import * as S from './styles';

export const Dashboard = () => {
  const { getItem } = useStorage(STORAGE_TRANSACTIONS_KEY);

  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const storagedTransactions = await getItem();
      const formattedTransactions = formatTransactions(storagedTransactions);
      setTransactions(formattedTransactions || []);
    }

    fetchTransactions();
  }, []);

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
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard {...item} />
          )}
        />

      </S.Transactions>
    </S.Container>
  );
}