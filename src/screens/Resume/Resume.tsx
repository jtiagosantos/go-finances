import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

//components
import { Header } from '../../components/Header/Header';
import { HistoricListItem } from '../../components/HistoricListItem/HistoricListItem';
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading';

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeDate = (action: 'next' | 'previous') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  const loadResumeData = async () => {
    setIsLoading(true);

    const storagedTransactions = await getItem();
    
    const transactions = storagedTransactions.filter(
      (transaction: Transaction) => 
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    );
    const transactionsTotal = transactions.reduce(
      (acumullator: number, expensive: Transaction) => {
        return acumullator + Number(expensive.amount)
      }, 0);
    const totalByCategory: TotalByCategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      transactions.forEach((transaction: Transaction) => {
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
        const percent = `${((categorySum / transactionsTotal) * 100).toFixed(0)}%`;

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
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadResumeData();
  }, [selectedDate]));

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <S.Content>
        <S.MonthSelector>
          <S.MonthSelectorButton onPress={() => handleChangeDate('previous')}>
            <S.MonthSelectorIcon name="chevron-left" />
          </S.MonthSelectorButton>

          <S.Month>
            {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
          </S.Month>

          <S.MonthSelectorButton onPress={() => handleChangeDate('next')}>
            <S.MonthSelectorIcon name="chevron-right" />
          </S.MonthSelectorButton>
        </S.MonthSelector>

        {isLoading && (
          <S.LoadingContainer>
            <SpinnerLoading />
          </S.LoadingContainer>
        )}

        {!isLoading && (
          <>
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
          </>
        )}
      </S.Content>
    </S.Container>
  );
}