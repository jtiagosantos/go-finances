import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Legend = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;