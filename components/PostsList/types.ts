import { PostBaseType } from 'components/Post/types';

export interface PostLiType extends PostBaseType {
  isCreate?: boolean;
  onDeleteClick?(item: PostLiType): void;
}

export interface PostsListType {
  posts: PostLiType[];
}

export interface PostItemDeleteModalType {
  isOpen: boolean;
  itemName: string;
  onResultConfirmModal(result: boolean): void;
}
