import React, { MouseEvent, KeyboardEvent, Ref } from 'react';
import { SingleInputStyle } from './styles';
import { SingleInputType } from './types';

const SingleInputInternal = (props: SingleInputType, ref: Ref<HTMLInputElement>) => {
  const { value, isSubmitting, onChange, onBackspace, onRight, onLeft } = props;

  const onClickInternal = (event: MouseEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).select();
  };

  const onKeyDownInternal = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (key === 'Backspace') {
      event.preventDefault();
      onBackspace(props);
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      onRight(props);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      onLeft(props);
    } else if (key === '0' || Number.parseInt(key)) {
      event.preventDefault();
      onChange(props, key);
    }
  };

  return (
    <SingleInputStyle
      ref={ref}
      onChange={() => {}}
      onClick={onClickInternal}
      onKeyDown={onKeyDownInternal}
      maxLength={1}
      value={value}
      spellCheck='false'
      disabled={isSubmitting}
    />
  );
};

export const SingleInput = React.forwardRef(SingleInputInternal);
