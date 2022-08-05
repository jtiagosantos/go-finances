import { TextInputProps } from 'react-native';

export interface ControlledInputProps extends TextInputProps {
  control: any;
  name: string;
  error: string | undefined;
}