import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  padding: 24px;
  
  flex: 1;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
  width: 100%;
  margin: 16px 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;