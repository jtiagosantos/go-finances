import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export const SpinnerLoading = () => {
  const { colors } = useTheme();

  return (
    <ActivityIndicator 
      color={colors.primary}
      size="large"
    />
  );
}