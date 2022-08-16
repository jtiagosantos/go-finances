export interface TransactionCardProps {
  transactionType: 'inflow' | 'outflow';
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface AmountProps {
  color: string;
}