import React, { FC } from 'react';
import { Modal } from 'components/Modal';
import { DriveItemRemoveModalType } from './types';
import {
  CancelButtonModal,
  RemoveButtonModal,
  RemoveModalWrapper,
} from './styles';

export const DriveItemRemoveModal: FC<DriveItemRemoveModalType> = ({
  isOpen,
  itemName,
  onResultConfirmModal,
}) => {
  const onConfirmRemove = () => {
    onResultConfirmModal(true);
  };

  const onCancelRemove = () => {
    onResultConfirmModal(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      showCloseButton={false}
      title={`Remove ${itemName} item ?`}
    >
      <RemoveModalWrapper>
        <RemoveButtonModal onClick={onConfirmRemove}>Remove</RemoveButtonModal>
        <CancelButtonModal onClick={onCancelRemove}>Cancel</CancelButtonModal>
      </RemoveModalWrapper>
    </Modal>
  );
};
