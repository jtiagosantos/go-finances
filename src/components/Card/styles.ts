import styled from 'styled-components/native';
import { AnyStyledComponent } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

//types
import { IconProps, StyleProps } from './types';

export const Container = styled.View<StyleProps>`
  width: ${RFValue(300)}px;
  background-color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.secondary.normal : theme.colors.shape
  };
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.title
  };
`;

export const Footer = styled.View``;

export const Amount = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.title
  };
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text
  };
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)<IconProps>`
  font-size: ${RFValue(40)}px;
  color: ${({ color }) => color};
`;