import { UseAnimationState } from 'moti';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

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

interface AnimationState {
  from: any;
  to: any;
}

interface Icon {
  name: any;
  size: number;
  color: string;
}

export interface AnimatedIconProps {
  animationState: UseAnimationState<AnimationState>;
  style: StyleProp<ViewStyle>;
  icon: Icon;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}