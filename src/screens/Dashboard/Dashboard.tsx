import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

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

  const fetchTransactions = async () => {
    const storagedTransactions = await getItem();
    const formattedTransactions = formatTransactions(storagedTransactions);
    setTransactions(formattedTransactions || []);
  }
  
  useFocusEffect(useCallback(() => {
    fetchTransactions();
  }, []));

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
        {!!transactions.length && (
          <>
            <S.Title>Listagem</S.Title>

            <S.TransactionList 
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionCard {...item} />
              )}
            />
          </>
        )}

      </S.Transactions>
    </S.Container>
  );
}