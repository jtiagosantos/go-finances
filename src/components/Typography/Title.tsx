import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;