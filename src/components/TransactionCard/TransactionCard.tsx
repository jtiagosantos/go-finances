import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MotiView, useAnimationState } from 'moti';

//components
import { AnimatedIcon } from './AnimatedIcon';

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
        <AnimatedIcon 
          icon={{
            name: 'more-vertical',
            size: 24,
            color: colors.title,
          }}
          animationState={moreIconAnimationState}
          style={styles.moreIcon}
          onPress={handleToggleCard}
        />
        <AnimatedIcon 
          icon={{
            name: 'x',
            size: 24,
            color: colors.title,
          }}
          animationState={closeIconAnimationState}
          style={styles.closeIcon}
          onPress={handleToggleCard}
        />
      </S.Card>
      <AnimatedIcon 
        icon={{
          name: 'trash-2',
          size: 36,
          color: colors.text,
        }}
        animationState={trashIconAnimationState}
        style={styles.trashIcon}
        onPress={() => onDeleteTransaction(id)}
      />
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