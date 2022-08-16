import { DataListProps as Transaction } from '../screens/Dashboard/types';

const formatAmount = (amount: string) => {
  return Number(amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

const formatDate = (date: string) => {
  return Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(date));
}

export const formatTransactions = (transactions: Transaction[]) => {
  const formattedTransactions: Transaction[] = transactions.map(
    (item: Transaction) => {
      const amount = formatAmount(item.amount);
      const date = formatDate(item.date);

      return {
        ...item,
        amount,
        date,
      }
    }
  );

  return formattedTransactions;
}