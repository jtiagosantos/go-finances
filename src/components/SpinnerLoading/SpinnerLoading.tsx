import { FC } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components';

export const SpinnerLoading: FC<ActivityIndicatorProps> = ({ ...props }) => {
  const { colors } = useTheme();

  return (
    <ActivityIndicator 
      color={colors.primary}
      size="large"
      {...props}
    />
  );
}