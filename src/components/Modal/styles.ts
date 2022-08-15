import styled from 'styled-components/native';

export const ModalContent = styled.View`
  width: 100%;
  flex: 0.56;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const ModalDivider = styled.View`
  width: 100px;
  height: 7px;
  background-color: #ccc;
  border-radius: 10px;
  align-self: center;
  margin-bottom: 24px;
`;