import React, { useEffect, useState } from 'react';

//components
import { Header } from '../../components/Header/Header';
import { HistoricListItem } from '../../components/HistoricListItem/HistoricListItem';

//hooks
import { useStorage } from '../../hooks/useStorage';

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
  const [totalCategoryData, setTotalCategoryData] = useState<TotalByCategoryData[]>([]);

  const loadResumeData = async () => {
    const transactions = await getItem();
    
    const expensivesTransactions = transactions.filter(
      (transaction: Transaction) => transaction.transactionType === 'outflow'
    );
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

        totalByCategory.push({
          name: category.name,
          total,
          color: category.color,
        });
      }
    });

    setTotalCategoryData(totalByCategory);
  }

  useEffect(() => {
    loadResumeData();
  }, []);

  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <S.Content>
        {totalCategoryData.map((category) => (
          <HistoricListItem 
            key={category.color}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </S.Content>

    </S.Container>
  );
}