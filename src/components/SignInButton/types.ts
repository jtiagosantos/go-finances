import { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface SignInButtonProps extends TouchableOpacityProps {
  text: string;
  icon: FC<SvgProps>;
}