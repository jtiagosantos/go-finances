export interface Transaction {
  transactionType: 'outflow' | 'inflow'; 
  name: string;
  amount: string;
  category: string;
}

export interface TotalByCategoryData {
  name: string;
  total: string;
  color: string;
}