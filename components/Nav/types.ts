export interface NavNodeBaseType {
  id: string;
  name: string;
  path?: string;
  bottom?: boolean;
  subItems?: NavNodeBaseType[];
}

export interface NavType {
  navItemsContent: string;
}
