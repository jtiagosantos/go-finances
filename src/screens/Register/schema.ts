import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório'),
  amount: yup
    .number()
    .required('Campo obrigatório')
    .typeError('Informe um valor numérico')
    .positive('Informe um valor positivo')
});