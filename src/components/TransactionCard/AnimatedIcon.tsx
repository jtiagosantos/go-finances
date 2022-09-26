import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';

//types
import { AnimatedIconProps } from './types';

export const AnimatedIcon: FC<AnimatedIconProps> = ({ 
  animationState,
  style,
  icon: { name, size, color },
  onPress,
}) => {
  return (
    <MotiView
      transition={{
        type: 'timing',
        duration: 600,
      }}
      state={animationState}
      style={style}
    >
      <TouchableOpacity
        activeOpacity={.6} 
        onPress={onPress}
      >
        <Feather 
          name={name}
          size={size}
          color={color}
        />
      </TouchableOpacity>
    </MotiView>
  );
}