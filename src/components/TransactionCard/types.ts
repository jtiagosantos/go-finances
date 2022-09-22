export interface TransactionCardProps {
  id: string;
  transactionType: 'inflow' | 'outflow';
  name: string;
  amount: string;
  category: string;
  date: string;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
}

export interface AmountProps {
  color: string;
}