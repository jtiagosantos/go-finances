import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key: string) => {
  const setItem = async (value: unknown) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch {
      Alert.alert('Erro ao salvar os dados');
    }
  }

  const getItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch {
      Alert.alert('Erro ao carregar os dados');
    }
  }

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      Alert.alert('Erro ao remover os dados');
    }
  }

  return { setItem, getItem, removeItem };
}