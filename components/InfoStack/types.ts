export const enum InfoStatus {
  Bad,
  Pending,
  Good,
}

export interface InfoType {
  id?: string;
  text: string;
  status: InfoStatus;
}

export interface InfoStackContextValueType {
  infos: InfoType[];
  pushInfo(info: InfoType): void;
  removeInfo(info: InfoType): void;
}
