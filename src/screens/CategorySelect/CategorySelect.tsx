import React, { FC } from 'react';

//components
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Form/Button/Button';

//utils
import { categories } from '../../utils/categories';

//types
import { CategorySelectProps } from './types';

//styles
import * as S from './styles';

export const CategorySelect: FC<CategorySelectProps> = ({ 
  category,
  setCategory,
  onCloseCategorySelect,
}) => {
  return (
    <S.Container>
      <Header title="Cadastro" />

      <S.CategoryList 
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category 
            onPress={() => setCategory(item)}
            isSelected={category.key === item.key}
          >
            <S.Icon name={item.icon} color={item.color} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Divider />}
      />

      <S.Footer>
        <Button 
          title="Selecionar" 
          onPress={onCloseCategorySelect}
        />
      </S.Footer>
    </S.Container>
  );
}