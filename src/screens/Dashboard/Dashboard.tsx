import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

//components
import { Card } from '../../components/Card/Card';
import { TransactionCard } from '../../components/TransactionCard/TransactionCard';
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading';

//hooks
import { useStorage } from '../../hooks/useStorage';

//utils
import { formatTransactions } from '../../utils/formatTransactions';

//constants
import { STORAGE_TRANSACTIONS_KEY } from '../../constants/storage';

//types
import { DataListProps, CardsData } from './types';

//styles
import * as S from './styles';

export const Dashboard = () => {
  const { getItem } = useStorage(STORAGE_TRANSACTIONS_KEY);

  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [cardsData, setCardsData] = useState({} as CardsData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    setIsLoading(true);

    const storagedTransactions = await getItem();
    const {
      formattedTransactions,
      expensiveTotal,
      entriesTotal,
      allTotal,
    } = formatTransactions(storagedTransactions);

    setTransactions(formattedTransactions || []);
    setCardsData({
      expensiveTotal,
      entriesTotal,
      allTotal,
    });
    setIsLoading(false);
  }
  
  useFocusEffect(useCallback(() => {
    fetchTransactions();
  }, []));

  return (
    <>
      {isLoading ? (
        <S.LoadingContainer>
          <SpinnerLoading />
        </S.LoadingContainer>
      ) : (
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
              amount={cardsData?.entriesTotal} 
              lastTransaction='Última entrada dia 13 de abril'  
            />
            <Card 
              type='outflow'
              title='Saídas' 
              amount={cardsData?.expensiveTotal} 
              lastTransaction='Última saída dia 03 de abril' 
            />
            <Card 
              type='total'
              title='Total' 
              amount={cardsData?.allTotal} 
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
      )}
    </>
  );
}