import React, { FC } from 'react';

//utils
import { categories } from '../../utils/categories';

//types
import { CategoryListProps, Item } from './types';

//styles
import * as S from './styles';

export const CategoryList: FC<CategoryListProps> = ({ 
  category,
  setCategory,
  onCloseCategoryList,
}) => {
  const handleSelectCategory = (item: Item) => {
    setCategory(item);
    onCloseCategoryList();
  }

  return (
    <S.Container 
      data={categories}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <S.Category 
          onPress={() => handleSelectCategory(item)}
          isSelected={category.key === item.key}
        >
          <S.Icon name={item.icon} color={item.color} />
          <S.Name>{item.name}</S.Name>
        </S.Category>
      )}
      ItemSeparatorComponent={() => <S.Divider />}
    />
  );
}