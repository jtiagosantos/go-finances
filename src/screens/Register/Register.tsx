import React, { useState } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Toast from 'react-native-simple-toast';

//components
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Form/Button/Button';
import { 
  TransactionTypeButton 
} from '../../components/Form/TransactionTypeButton/TransactionTypeButton';
import { SelectCategory } from '../../components/Form/SelectCategory/SelectCategory';
import { CategorySelect } from '../CategorySelect/CategorySelect';
import { ControlledInput } from '../../components/Form/ControlledInput/ControlledInput';

//hooks
import { useDisclosure } from '../../hooks/useDisclosure';

//schemas
import { schema } from './schema';

//types
import { TransactionType, FormData } from './types';

//styles
import * as S from './styles';

export const Register = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
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

  const handleRegister = (formData: FormData) => {
    if (!selectedTransactionType) {
      return Toast.show('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Toast.show('Selecione a categoria da transação');
    }

    const { name, amount } = formData;

    const data = {
      name,
      amount,
      transactionType: selectedTransactionType,
      category: category.name,
    }

    console.log(data)
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

        <Modal visible={isOpen} statusBarTranslucent>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            onCloseCategorySelect={onToggle}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}