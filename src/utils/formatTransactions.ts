import { DataListProps as Transaction } from '../screens/Dashboard/types';

const formatAmount = (amount: string | number) => {
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
  let entriesTotal = 0;
  let expensiveTotal = 0;

  const formattedTransactions: Transaction[] = transactions.map(
    (item: Transaction) => {
      if (item.transactionType === 'inflow') {
        entriesTotal += Number(item.amount)
      } else {
        expensiveTotal += Number(item.amount)
      }

      const amount = formatAmount(item.amount);
      const date = formatDate(item.date);

      return {
        ...item,
        amount,
        date,
      }
    }
  );

  const allTotal = Number((entriesTotal - expensiveTotal).toFixed(2));

  return {
    formattedTransactions,
    entriesTotal: formatAmount(entriesTotal), 
    expensiveTotal: formatAmount(expensiveTotal),
    allTotal: formatAmount(allTotal),
  };
}