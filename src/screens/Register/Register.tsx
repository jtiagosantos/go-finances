import React, { useState } from 'react';
import { Modal } from 'react-native';

//components
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Form/Input/Input';
import { Button } from '../../components/Form/Button/Button';
import { 
  TransactionTypeButton 
} from '../../components/Form/TransactionTypeButton/TransactionTypeButton';
import { SelectCategory } from '../../components/Form/SelectCategory/SelectCategory';
import { CategorySelect } from '../CategorySelect/CategorySelect';

//hooks
import { useDisclosure } from '../../hooks/useDisclosure';

//types
import { TransactionType } from './types';

//styles
import * as S from './styles';

export const Register = () => {
  const { isOpen, onToggle } = useDisclosure();

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

  return (
    <S.Container>
      <Header title="Cadastro" />

      <S.Form>
        <S.Fields>
          <Input 
            placeholder="Nome"
          />
          <Input 
            placeholder="Preço"
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
  );
}