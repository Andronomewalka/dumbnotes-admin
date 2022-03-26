import React, { FC } from 'react';
import { Modal } from 'components/Modal';
import { PostItemDeleteModalType } from './types';
import { CancelButtonModal, DeleteButtonModal, DeleteModalWrapper } from './styles';

export const DeletePostModal: FC<PostItemDeleteModalType> = ({
  isOpen,
  itemName,
  onResultConfirmModal,
}) => {
  const onConfirmDelete = () => {
    onResultConfirmModal(true);
  };

  const onCancelDelete = () => {
    onResultConfirmModal(false);
  };

  return (
    <Modal isOpen={isOpen} showCloseButton={false} title={`Delete ${itemName} item ?`}>
      <DeleteModalWrapper>
        <DeleteButtonModal onClick={onConfirmDelete}>Delete</DeleteButtonModal>
        <CancelButtonModal onClick={onCancelDelete}>Cancel</CancelButtonModal>
      </DeleteModalWrapper>
    </Modal>
  );
};
