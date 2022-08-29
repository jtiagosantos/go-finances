import React from 'react';

//components
import { Header } from '../../components/Header/Header';
import { HistoricListItem } from '../../components/HistoricListItem/HistoricListItem';

//styles
import * as S from './styles';

export const Resume = () => {
  return (
    <S.Container>
      <Header title="Resumo por categoria" />

      <HistoricListItem 
        color='red'
        title='Casa'
        amount='R$ 1200'
      />
    </S.Container>
  );
}