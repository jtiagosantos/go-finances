export interface Transaction {
  transactionType: 'outflow' | 'inflow'; 
  name: string;
  amount: string;
  category: string;
}

export interface TotalByCategoryData {
  name: string;
  total: number;
  formattedTotal: string;
  percent: string;
  color: string;
}