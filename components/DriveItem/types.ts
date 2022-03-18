export interface DriveItemBaseType {
  id: string;
  name: string;
}

export interface DriveItemType extends DriveItemBaseType {
  path: string;
  content: string;
}
