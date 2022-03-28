import React, { FC } from 'react';
import Link from 'next/link';
import { NavCardWrapper, NavCardA } from './styles';

export const NavCard: FC = () => {
  return (
    <NavCardWrapper>
      <Link href={`/navigation`} passHref>
        <NavCardA>Navigation</NavCardA>
      </Link>
    </NavCardWrapper>
  );
};
