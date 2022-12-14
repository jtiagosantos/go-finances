import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

//components
import { Card } from '../../components/Card/Card';
import { TransactionCard } from '../../components/TransactionCard/TransactionCard';
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading';
import { Title } from '../../components/Typography/Title';
import { Legend } from '../../components/Typography/Legend';

//hooks
import { useStorage } from '../../hooks/useStorage';
import { useAuthDispatch } from '../../hooks/auth/useAuthDispatch';
import { useAuthState } from '../../hooks/auth/useAuthState';

//utils
import { formatTransactions } from '../../utils/formatTransactions';
import { getLastTransactionDate } from '../../utils/getLastTransactionDate';
import { formatTotalLastDate } from '../../utils/formatTotalLastDate';

//types
import { DataListProps, CardsData } from './types';

//styles
import * as S from './styles';

export const Dashboard = () => {
  const { user } = useAuthState();

  const STORAGE_TRANSACTIONS_KEY = `@gofinances:transactions-user:${user?.id}`;

  const { getItem, setItem } = useStorage(STORAGE_TRANSACTIONS_KEY);
  const { signOut } = useAuthDispatch();

  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [cardsData, setCardsData] = useState({} as CardsData);
  const [isLoading, setIsLoading] = useState(true);

  const getLastTransactions = () => {
    const lastEntryTransactionDate = getLastTransactionDate(transactions, 'inflow');
    const lastExpensiveTransactionDate = getLastTransactionDate(transactions, 'outflow');

    setCardsData({
      ...cardsData,
      lastDate: {
        entry: `Última entrada em ${lastEntryTransactionDate}`,
        expensive: `Última saída em ${lastExpensiveTransactionDate}`,
        total: formatTotalLastDate(lastExpensiveTransactionDate)
      }
    });
  }

  const fetchTransactions = async () => {
    setIsLoading(true);

    const storagedTransactions = await getItem();
    const {
      formattedTransactions,
      expensiveTotal,
      entriesTotal,
      allTotal,
    } = formatTransactions(storagedTransactions || []);

    setTransactions(formattedTransactions || []);
    setCardsData({
      ...cardsData,
      expensiveTotal,
      entriesTotal,
      allTotal,
    });
    setIsLoading(false);
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    const transactions = await getItem();
    const filteredTransactions = transactions.filter(
      (transaction: DataListProps) => transaction.id !== transactionId
    );
    await setItem(filteredTransactions);
    fetchTransactions();
  }
  
  useFocusEffect(useCallback(() => {
    fetchTransactions();
  }, []));

  /* useFocusEffect(useCallback(() => {
    getLastTransactions();
  }, [transactions]));
 */
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
                <S.Photo source={{ uri: user?.photo }} />
                <S.User>
                  <S.Greeting>Olá, </S.Greeting>
                  <S.UserName>{user?.name}</S.UserName>
                </S.User>
              </S.UserInfo>
              <TouchableOpacity onPress={signOut}>
                <S.Icon name="power" />
              </TouchableOpacity>
            </S.UserWrapper>
          </S.Header>

          <S.Cards>
            <Card 
              type='inflow'
              title='Entradas' 
              amount={cardsData?.entriesTotal} 
              lastTransaction={cardsData?.lastDate?.entry}
            />
            <Card 
              type='outflow'
              title='Saídas' 
              amount={cardsData?.expensiveTotal} 
              lastTransaction={cardsData?.lastDate?.expensive} 
            />
            <Card 
              type='total'
              title='Total' 
              amount={cardsData?.allTotal} 
              lastTransaction={cardsData?.lastDate?.total} 
            />
          </S.Cards>

          <S.Transactions>
            {!!transactions.length ? (
              <>
                <S.Title>Listagem</S.Title>

                <S.TransactionList 
                  data={transactions}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TransactionCard 
                      {...item} 
                      onDeleteTransaction={handleDeleteTransaction}
                    />
                  )}
                />
              </>
            ) : (
              <View style={{marginTop: 100}}>
                <Title>Sem registros</Title>
                <Legend>Cadastre transações para vê-las aqui</Legend>
              </View>
            )}
          </S.Transactions>
        </S.Container>
      )}
    </>
  );
}