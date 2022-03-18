import { DriveItemType } from 'components/DriveItem';

export interface Response<T> {
  response: T;
  error: string;
}

type NewDriveItem = Omit<DriveItemType, 'id'>;

export interface CreateDriveItem {
  newItem: NewDriveItem;
  mimeType: string;
}

export interface NameObjectType {
  name: string;
  path: string;
}
