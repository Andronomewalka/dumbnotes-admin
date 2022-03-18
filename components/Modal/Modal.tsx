import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import {
  CloseButton,
  ModalRoot,
  Overlay,
  overlayTransitionName,
  modalTransitionName,
  Title,
  TitleWrapper,
} from './styles';
import { InternalState, ModalProp } from './types';

const CloseIcon = () => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='16' cy='16' r='16' fill='#EFF1F3' />
    <path
      d='M19.9993 20L12 12.0008'
      stroke='#818FA4'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M20 12L12.0007 19.9992'
      stroke='#818FA4'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

function Modal(
  {
    isOpen,
    onClose,
    children,
    padding = '20px',
    title = '',
    background = 'white',
    showCloseButton = true,
  }: ModalProp,
  ref: any
) {
  const [internalState, setInternalState] = useState(InternalState.Dispose); // can't use CSSTransition before it renders or after wrapper is removed
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (internalState === InternalState.Dispose && isOpen)
      setInternalState(InternalState.Init);
    else if (internalState === InternalState.Init) setInternalState(InternalState.Open);
    else if (internalState === InternalState.Open && !isOpen)
      setInternalState(InternalState.Close);
  }, [internalState, isOpen]);

  useEffect(() => {
    if (modalRef?.current && ref) {
      ref.current = modalRef.current;
    }
  }, [modalRef, ref]);

  if (typeof document !== 'object') {
    // ssr
    return null;
  }

  const preventEventHandler = (event: any) => {
    event.stopPropagation();
  };

  const onCloseTransitionExited = () => {
    setInternalState(InternalState.Dispose);
  };

  return ReactDom.createPortal(
    <>
      {internalState !== InternalState.Dispose && (
        <div onTouchMove={preventEventHandler} onMouseMove={preventEventHandler}>
          <CSSTransition
            in={internalState === InternalState.Open}
            timeout={500}
            unmountOnExit
            onExited={onCloseTransitionExited}
            nodeRef={overlayRef}
            classNames={overlayTransitionName}
          >
            <Overlay
              ref={overlayRef}
              zIndex={999 + document.getElementById('portal')!.children.length}
            />
          </CSSTransition>
          <CSSTransition
            in={internalState === InternalState.Open}
            timeout={500}
            unmountOnExit
            nodeRef={modalRef}
            classNames={modalTransitionName}
          >
            <ModalRoot
              ref={modalRef}
              background={background}
              padding={padding}
              zIndex={999 + document.getElementById('portal')!.children.length}
            >
              <TitleWrapper>
                <Title>{title}</Title>
              </TitleWrapper>
              {showCloseButton && (
                <CloseButton disabled={false} type='button' onClick={onClose}>
                  <CloseIcon />
                </CloseButton>
              )}
              {children}
            </ModalRoot>
          </CSSTransition>
        </div>
      )}
    </>,
    document.getElementById('portal')!
  );
}

export default React.forwardRef(Modal);
