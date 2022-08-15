import { categories } from '../../utils/categories';

interface Category {
  key: string;
  name: string;
}

export interface CategoryListProps {
  category: Category;
  setCategory: (category: Category) => void;
  onCloseCategoryList: () => void;
}

export type ContainerProps = typeof categories[0];

export type Item = ContainerProps;

export interface CategoryProps {
  isSelected: boolean;
}