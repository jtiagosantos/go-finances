//types
import { 
  TransactionCardProps 
} from '../../components/TransactionCard/types';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export interface CardsData {
  expensiveTotal: string;
  entriesTotal: string;
  allTotal: string;
}