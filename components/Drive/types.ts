import { DriveItemBaseType } from 'components/DriveItem';

export interface DriveLiType extends DriveItemBaseType {
  isCreate?: boolean;
  onRemoveClick?(item: DriveLiType): void;
}

export interface DriveType {
  driveItems: DriveLiType[];
}

export interface DriveItemRemoveModalType {
  isOpen: boolean;
  itemName: string;
  onResultConfirmModal(result: boolean): void;
}
