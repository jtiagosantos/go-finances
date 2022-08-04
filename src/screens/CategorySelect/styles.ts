import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { AnyStyledComponent } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//types
import { CategoryListProps, CategoryProps } from './types';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CategoryList = styled.FlatList`
  width: 100%;

  flex: 1;
` as unknown as typeof FlatList<CategoryListProps>;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  background-color: ${({ isSelected, theme }) => 
    isSelected ? 
    theme.colors.secondary.light 
    : 
    theme.colors.background
  };

  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;