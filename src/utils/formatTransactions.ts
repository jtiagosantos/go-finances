import { DataListProps as Transaction } from '../screens/Dashboard/types';
import { formatDate } from './formatDate';
import { formatAmount } from './formatAmount';

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