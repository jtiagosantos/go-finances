import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { AnyStyledComponent } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

//types
import { ContainerProps, IconProps } from './types';

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 49%;
  border-width: 1.5px;
  border-style: solid;
  padding: 16px;
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ theme, isSelected, variantColor }) => {
    return isSelected ? (
      css`
        border-color: ${variantColor};
        background-color: ${variantColor};
      `
    ) : (
      css`
        border-color: ${theme.colors.text};
      `
    );
  }}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ color }) => color};
`;