import React, { FC } from 'react';
import Link from 'next/link';
import { DeleteButtonIcon } from './DeleteButtonIcon';
import { PostLiA, PostLiDeleteButton, PostLiWrapper } from './styles';
import { PostLiType } from './types';

export const PostLi: FC<PostLiType> = (prop) => {
  const { path, name, isCreate, onDeleteClick } = prop;
  const onDeletelickInternal = () => {
    onDeleteClick?.(prop);
  };

  return (
    <PostLiWrapper isCreate={!!isCreate}>
      <Link href={`/${path}`} passHref>
        <PostLiA>{name}</PostLiA>
      </Link>
      {!isCreate && (
        <PostLiDeleteButton onClick={onDeletelickInternal}>
          <DeleteButtonIcon />
        </PostLiDeleteButton>
      )}
    </PostLiWrapper>
  );
};
