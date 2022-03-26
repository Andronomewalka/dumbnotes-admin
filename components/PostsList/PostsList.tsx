import React, { FC, useState } from 'react';
import { useDeletePost } from 'hooks/useDeletePost';
import { DeletePostModal } from './DeletePostModal';
import { PostLi } from './PostLi';
import { PostUlWrapper } from './styles';
import { PostLiType, PostsListType } from './types';

const defaultPostItem: PostLiType = {
  id: 'default',
  name: 'default',
  path: 'default',
};

export const PostsList: FC<PostsListType> = ({ posts }) => {
  const [ownPostItems, setOwnPostItem] = useState(posts);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PostLiType>(defaultPostItem);
  const deletePost = useDeletePost();

  const onCloseConfirmDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onResultConfirmModal = async (result: boolean) => {
    onCloseConfirmDeleteModal();
    if (result) {
      await deletePost(selectedItem, () => {
        setOwnPostItem([...ownPostItems.filter((cur) => cur.id !== selectedItem.id)]);
      });
    }
  };

  const onDeleteClick = (item: PostLiType) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const items = [
    ...ownPostItems,
    {
      id: 'new',
      name: 'Create new',
      path: 'new',
      isCreate: true,
    },
  ];

  items.forEach((item) => {
    item.onDeleteClick = onDeleteClick;
  });

  return (
    <PostUlWrapper>
      {items.map((item) => (
        <PostLi key={item.id} {...item} />
      ))}
      <DeletePostModal
        isOpen={isDeleteModalOpen}
        itemName={selectedItem.name}
        onResultConfirmModal={onResultConfirmModal}
      />
    </PostUlWrapper>
  );
};
