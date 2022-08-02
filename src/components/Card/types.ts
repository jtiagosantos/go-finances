export interface CardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'inflow' | 'outflow' | 'total';
};

export interface IconProps {
  color: string;
};

export interface StyleProps {
  type: 'inflow' | 'outflow' | 'total';
}