interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: 'inflow' | 'outflow';
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export interface AmountProps {
  color: string;
}