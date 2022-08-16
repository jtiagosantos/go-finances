import { DataListProps as Transaction } from '../screens/Dashboard/types';

export const getLastTransactionDate = (
  transactions: Transaction[], 
  type: 'inflow' | 'outflow'
) => {
  const lastTransaction = transactions.filter((transaction) => (
    transaction.transactionType === type
  ))[0];

  return lastTransaction?.date;
}