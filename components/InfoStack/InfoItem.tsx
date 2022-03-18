import React, { Ref } from 'react';
import { InfoType } from './types';
import { InfoItemStyled } from './styles';

const InfoItem = ({ text, status }: InfoType, ref: Ref<HTMLLIElement>) => {
  return (
    <InfoItemStyled ref={ref} status={status}>
      {text}
    </InfoItemStyled>
  );
};

export default React.forwardRef<HTMLLIElement, InfoType>(InfoItem);
