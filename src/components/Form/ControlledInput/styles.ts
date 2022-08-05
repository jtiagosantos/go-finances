import styled from 'styled-components/native';
import { AnyStyledComponent } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.View`
  width: 100%;
  margin-top: -5px;

  flex-direction: row;
  align-items: center;
`;

export const TextError = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention.normal};
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)`
  font-size: ${RFValue(14)}px;
  margin-right: 4px;
  margin-top: -4px;
  color: ${({ theme }) => theme.colors.attention.normal};
`;