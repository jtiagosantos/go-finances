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
    from: {
      translateX: 0,
    },
    to: {
      translateX: -80,
    },
  });
  const trashIconAnimationState = useAnimationState({
    from: {
      opacity: 0,
      rotate: '100deg',
    },
    to: {
      opacity: 1,
      rotate: '0deg',
    },
  });
  const moreIconAnimationState = useAnimationState({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });
  const closeIconAnimationState = useAnimationState({
    from: {
      opacity: 0,
      rotate: '100deg',
    },
    to: {
      opacity: 1,
      rotate: '0deg',
    },
  });

  const handleToggleCard = () => {
    if (cardAnimationState.current === 'to') {
      cardAnimationState.transitionTo('from');
      trashIconAnimationState.transitionTo('from');
      moreIconAnimationState.transitionTo('to');
      closeIconAnimationState.transitionTo('from');
    } else {
      cardAnimationState.transitionTo('to');
      trashIconAnimationState.transitionTo('to');
      moreIconAnimationState.transitionTo('from');
      closeIconAnimationState.transitionTo('to');
    }
  }

  useEffect(() => {
    cardAnimationState.transitionTo('from');
    trashIconAnimationState.transitionTo('from');
    moreIconAnimationState.transitionTo('to');
    closeIconAnimationState.transitionTo('from');
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
      <S.Card>
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
        <MotiView
          transition={{
            type: 'timing',
            duration: 600,
          }}
          state={moreIconAnimationState}
          style={styles.moreIcon}
        >
          <TouchableOpacity
            activeOpacity={.6} 
            onPress={handleToggleCard}
          >
            <Feather 
              name='more-vertical'
              size={24}
              color={colors.title}
            />
          </TouchableOpacity>
        </MotiView>
        <MotiView
          transition={{
            type: 'timing',
            duration: 600,
          }}
          state={closeIconAnimationState}
          style={styles.closeIcon}
        >
          <TouchableOpacity
            activeOpacity={.6} 
            onPress={handleToggleCard}
          >
            <Feather 
              name='x'
              size={24}
              color={colors.title}
            />
          </TouchableOpacity>
        </MotiView>
      </S.Card>
      <MotiView 
        transition={{
          type: 'timing',
          duration: 600,
        }}
        state={trashIconAnimationState}
        style={styles.trashIcon}
      >
        <TouchableOpacity 
          activeOpacity={.6} 
          onPress={() => onDeleteTransaction(id)}
        >
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
  trashIcon: {
    position: 'absolute',
    right: -64,
  },
  moreIcon: {
    position: 'absolute',
    right: 17,
    top: 17,
  },
  closeIcon: {
    position: 'absolute',
    right: 17,
    top: 17,
  }
});