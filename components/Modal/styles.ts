import styled from 'styled-components';
import { ModalRootProp, OverlayProp } from './types';

export const overlayTransitionName = 'overlay-transition';
export const modalTransitionName = 'modal-transition';

export const Overlay = styled.div<OverlayProp>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000099;
  z-index: ${(props) => props.zIndex};
  transition: all 0.5s ease;

  &.${overlayTransitionName}-enter {
    opacity: 0;
  }

  &.${overlayTransitionName}-enter-active {
    opacity: 1;
  }

  &.${overlayTransitionName}-enter-done {
    opacity: 1;
  }

  &.${overlayTransitionName}-exit {
    opacity: 1;
  }

  &.${overlayTransitionName}-exit-active {
    opacity: 0;
  }
`;

export const ModalRoot = styled.div<ModalRootProp>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1, 1);
  opacity: 1;
  max-height: 90%;
  padding: ${(props) => props.padding};
  border: 2px solid transparent;
  border-radius: ${(props) => props.theme.borderRadius};
  border-style: none;
  overflow-y: auto;
  background: ${(props) => props.background};
  z-index: ${(props) => props.zIndex};
  transition: all 0.3s ease;

  &.${modalTransitionName}-enter {
    transform: translate(-40%, -40%) scale(0, 0);
    opacity: 0;
  }

  &.${modalTransitionName}-enter-active {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }

  &.${modalTransitionName}-enter-done {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }

  &.${modalTransitionName}-exit {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }

  &.${modalTransitionName}-exit-active {
    transform: translate(-40%, -40%) scale(0, 0);
    opacity: 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #000000;
  text-align: left;
  margin-bottom: 1.5rem;

  :empty {
    margin-bottom: 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  top: 10px;
  right: 10px;
`;
