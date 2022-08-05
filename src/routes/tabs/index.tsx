import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import { Dashboard } from '../../screens/Dashboard/Dashboard';
import { Register } from '../../screens/Register/Register';

const Tab = createBottomTabNavigator();

export const TabRoutes = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, //remove header
        tabBarActiveTintColor: colors.secondary.normal, //active tab color
        tabBarInactiveTintColor: colors.text, //inactive tab color
        tabBarLabelPosition: 'beside-icon', //label position
        tabBarStyle: { //bar styles
          height: 72,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Tab.Screen 
        name='Listagem'
        component={Dashboard} 
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Cadastrar' 
        component={Register} 
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name='attach-money'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Resumo' 
        component={Register} 
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name='pie-chart'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}