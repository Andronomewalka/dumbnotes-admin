import React, { FC, useState } from 'react';
import { useRemoveDriveItem } from 'hooks/useRemoveDriveItem';
import { DriveItemRemoveModal } from './DriveItemRemoveModal';
import { DriveLi } from './DriveLi';
import { DriveUlWrapper } from './styles';
import { DriveLiType, DriveType } from './types';

const defaultDriveItem: DriveLiType = {
  id: 'default',
  name: 'default',
  path: 'default',
};

export const Drive: FC<DriveType> = ({ driveItems }) => {
  const [ownDriveItems, setOwnDriveItem] = useState(driveItems);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DriveLiType>(defaultDriveItem);
  const removeDriveItem = useRemoveDriveItem();

  const onCloseConfirmRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const onResultConfirmModal = async (result: boolean) => {
    onCloseConfirmRemoveModal();
    if (result) {
      await removeDriveItem(selectedItem, () => {
        setOwnDriveItem([...ownDriveItems.filter((cur) => cur.id !== selectedItem.id)]);
      });
    }
  };

  const onRemoveClick = (item: DriveLiType) => {
    setSelectedItem(item);
    setIsRemoveModalOpen(true);
  };

  const items = [
    ...ownDriveItems,
    {
      id: 'new',
      name: 'Create new',
      path: 'new',
      isCreate: true,
    },
  ];

  items.forEach((item) => {
    item.onRemoveClick = onRemoveClick;
  });

  return (
    <DriveUlWrapper>
      {items.map((item) => (
        <DriveLi key={item.id} {...item} />
      ))}
      <DriveItemRemoveModal
        isOpen={isRemoveModalOpen}
        itemName={selectedItem.name}
        onResultConfirmModal={onResultConfirmModal}
      />
    </DriveUlWrapper>
  );
};
