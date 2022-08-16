import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

//components
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Form/Button/Button';
import { 
  TransactionTypeButton 
} from '../../components/Form/TransactionTypeButton/TransactionTypeButton';
import { SelectCategory } from '../../components/Form/SelectCategory/SelectCategory';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { ControlledInput } from '../../components/Form/ControlledInput/ControlledInput';
import { Modal } from '../../components/Modal/Modal';

//hooks
import { useDisclosure } from '../../hooks/useDisclosure';
import { useStorage } from '../../hooks/useStorage';

//utils
import { generateId } from '../../utils/generateId';

//schemas
import { schema } from './schema';

//constants
import { STORAGE_TRANSACTIONS_KEY } from '../../constants/storage';

//types
import { TransactionType, FormData } from './types';

//styles
import * as S from './styles';

export const Register = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { setItem, getItem } = useStorage(STORAGE_TRANSACTIONS_KEY);
  const { navigate } = useNavigation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      amount: '',
    },
    resolver: yupResolver(schema),
  });

  const [
    selectedTransactionType, 
    setSelectedTransactionType
  ] = useState<TransactionType | ''>('');
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const handleSelectTransactionType = (type: TransactionType) => {
    setSelectedTransactionType(type);
  }

  const checkIsSelected = (type: TransactionType) => {
    return selectedTransactionType === type;
  }

  const handleRegister = async (formData: FormData) => {
    if (!selectedTransactionType) {
      return Toast.show('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Toast.show('Selecione a categoria da transação');
    }

    const { name, amount } = formData;

    const newTransaction = {
      id: generateId(),
      name,
      amount,
      transactionType: selectedTransactionType,
      category: category.name,
      date: new Date(),
    }

    const transactions = await getItem();
    await setItem([
      newTransaction,
      ...transactions || [],
    ]);

    reset();
    setSelectedTransactionType('');
    setCategory({
      key: 'category',
      name: 'Categoria',
    });

    navigate('Listagem');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <Header title="Cadastro" />

        <S.Form>
          <S.Fields>
            <ControlledInput 
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />
            <ControlledInput 
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount?.message}
            />

            <S.TransactionTypes>
              <TransactionTypeButton 
                title='Income'
                type='inflow'
                onPress={() => handleSelectTransactionType('inflow')}
                isSelected={checkIsSelected('inflow')}
              />
              <TransactionTypeButton 
                title='Outcome'
                type='outflow'
                onPress={() => handleSelectTransactionType('outflow')}
                isSelected={checkIsSelected('outflow')}
              />
            </S.TransactionTypes>

            <SelectCategory 
              title={category.name}
              onPress={onToggle}
            />
          </S.Fields>
          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </S.Form>

        <Modal 
          isVisible={isOpen} 
          onBackdropPress={onToggle} 
        >
          <CategoryList 
            category={category}
            setCategory={setCategory}
            onCloseCategoryList={onToggle}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}