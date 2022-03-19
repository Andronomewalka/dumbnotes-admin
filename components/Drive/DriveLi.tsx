import React, { FC } from 'react';
import Link from 'next/link';
import { RemoveButtonIcon } from './RemoveButtonIcon';
import { DriveLiA, DriveLiRemoveButton, DriveLiWrapper } from './styles';
import { DriveLiType } from './types';

export const DriveLi: FC<DriveLiType> = (prop) => {
  const { id, name, isCreate, onRemoveClick } = prop;
  const onRemoveClickInternal = () => {
    onRemoveClick?.(prop);
  };

  return (
    <DriveLiWrapper isCreate={!!isCreate}>
      <Link href={`/${id}`} passHref>
        <DriveLiA>{name}</DriveLiA>
      </Link>
      {!isCreate && (
        <DriveLiRemoveButton onClick={onRemoveClickInternal}>
          <RemoveButtonIcon />
        </DriveLiRemoveButton>
      )}
    </DriveLiWrapper>
  );
};
