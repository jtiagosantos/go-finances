import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MotiView, useAnimationState } from 'moti';

//types
import { TransactionCardProps } from './types';

//utils 
import { categories } from '../../utils/categories';

//styles
import * as S from './styles';

export const TransactionCard: FC<TransactionCardProps> = ({
  id,
  transactionType,
  name,
  amount,
  category,
  date,
  onDeleteTransaction,
}) => {
  const { colors } = useTheme();

  const [categoryData] = categories.filter((i) => i.key === category);
  const amountColor = {
    inflow: colors.success.normal,
    outflow: colors.attention.normal,
  }[transactionType];

  const cardAnimationState = useAnimationState({
    centralized: {
      translateX: 0,
    },
    left: {
      translateX: -80,
    },
  });
  const iconAnimationState = useAnimationState({
    from: {
      opacity: 0,
      rotate: '100deg',
    },
    to: {
      opacity: 1,
      rotate: '0deg',
    }
  });

  const handleToggleCard = () => {
    if (cardAnimationState.current === 'left') {
      cardAnimationState.transitionTo('centralized');
      iconAnimationState.transitionTo('from');
    } else {
      cardAnimationState.transitionTo('left');
      iconAnimationState.transitionTo('to');
    }
  }

  useEffect(() => {
    cardAnimationState.transitionTo('centralized');
    iconAnimationState.transitionTo('from');
  }, []);

  return (
    <MotiView
      transition={{
        type: 'timing',
        duration: 600,
      }}
      state={cardAnimationState}
      style={styles.container}
    >
      <S.Card onPress={handleToggleCard}>
        <S.Title>{name}</S.Title>
        <S.Amount color={amountColor}>
          {transactionType === 'outflow' && '- '}{amount}
        </S.Amount>
        <S.Footer>
          <S.Category>
            <S.Icon name={categoryData.icon} />
            <S.CategoryName>{categoryData.name}</S.CategoryName>
          </S.Category>
          <S.Date>{date}</S.Date>
        </S.Footer>
      </S.Card>
      <MotiView 
        transition={{
          type: 'timing',
          duration: 600,
        }}
        state={iconAnimationState}
        style={styles.icon}
      >
        <TouchableOpacity onPress={() => onDeleteTransaction(id)}>
          <Feather 
            name='trash-2'
            size={36}
            color={colors.text}
          />
        </TouchableOpacity>
      </MotiView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: -64,
  }
});