import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

//components
import { Header } from '../../components/Header/Header';
import { HistoricListItem } from '../../components/HistoricListItem/HistoricListItem';

//hooks
import { useStorage } from '../../hooks/useStorage';
import { useTheme } from 'styled-components';

//utils
import { categories } from '../../utils/categories';

//constants
import { STORAGE_TRANSACTIONS_KEY } from '../../constants/storage';

//types
import {Transaction, TotalByCategoryData} from './types';

//styles
import * as S from './styles';

export const Resume = () => {
  const { getItem } = useStorage(STORAGE_TRANSACTIONS_KEY);
  const { colors } = useTheme();
  const [totalCategoryData, setTotalCategoryData] = useState<TotalByCategoryData[]>([]);

  const loadResumeData = async () => {
    const transactions = await getItem();
    
    const expensivesTransactions = transactions.filter(
      (transaction: Transaction) => transaction.transactionType === 'outflow'
    );
    const expensivesTransactionsTotal = expensivesTransactions.reduce(
      (acumullator: number, expensive: Transaction) => {
        return acumullator + Number(expensive.amount)
      }, 0);
    const totalByCategory: TotalByCategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensivesTransactions.forEach((transaction: Transaction) => {
        if (transaction.category === category.key) {
          categorySum += Number(transaction.amount);
        }
      });

      if (!!categorySum) {
        const total = categorySum.toLocaleString(
          'pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }
        );
        const percent = `${((categorySum / expensivesTransactionsTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          formattedTotal: total,
          color: category.color,
          percent,
        });
      }
    });

    setTotalCategoryData(totalByCategory);
  }

  useFocusEffect(useCallback(() => {
    loadResumeData();
  }, []));

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <S.Content>
        <S.ChartContainer>
          <VictoryPie
            data={totalCategoryData}
            x="percent"
            y="total"
            height={370}
            colorScale={totalCategoryData.map((i) => i.color)}
            style={{
              labels: {
                fontSize: RFValue(15),
                fontWeight: 'bold',
                fill: colors.title,
              }
            }}
            labelRadius={140}
            animate={{
              easing: 'expOut',
              duration: 2000,
            }}
          />
        </S.ChartContainer>

        {totalCategoryData.map((category) => (
          <HistoricListItem 
            key={category.color}
            title={category.name}
            amount={category.formattedTotal}
            color={category.color}
          />
        ))}
      </S.Content>
    </S.Container>
  );
}