import React, { FC, createRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import InfoItem from './InfoItem';
import { useInfoContext } from './context';
import { TransitionWrapper } from './styles';

const InfoStack: FC = () => {
  const { infos, removeInfo } = useInfoContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (infos?.length) {
        const lastItem = infos[infos.length - 1];
        if (lastItem.id !== undefined) {
          removeInfo(lastItem);
        }
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [infos, removeInfo]);

  return (
    <TransitionWrapper component='ul'>
      {infos.map((info) => {
        const itemRef = createRef<HTMLLIElement>();
        return (
          <CSSTransition
            key={info.id}
            nodeRef={itemRef}
            timeout={500}
            classNames='info-transition'
          >
            <InfoItem ref={itemRef} {...info} />
          </CSSTransition>
        );
      })}
    </TransitionWrapper>
  );
};

export default InfoStack;
