import { TouchableOpacityProps } from 'react-native';

type TransactionType = 'inflow' | 'outflow';

export interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: TransactionType;
  title: string;
  isSelected: boolean;
}

export interface ContainerProps {
  isSelected: boolean;
  variantColor: string;
}

export interface IconProps {
  color: string;
}