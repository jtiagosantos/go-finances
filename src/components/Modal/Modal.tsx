import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import RNModal, { ModalProps } from 'react-native-modal';

//styles
import { ModalContent, ModalDivider } from './styles';

export const Modal: FC<Partial<ModalProps>> = ({ children, ...props }) => {
  return (
    <RNModal {...props} style={styles.modal} animationOutTiming={500}>
      <ModalContent>
        <ModalDivider />
        {children}
      </ModalContent>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 'auto',
    flex: 1,
    justifyContent: 'flex-end'
  }
});