import { categories } from '../../utils/categories';

interface Category {
  key: string;
  name: string;
}

export interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  onCloseCategorySelect: () => void;
}

export type CategoryListProps = typeof categories[0];

export interface CategoryProps {
  isSelected: boolean;
}