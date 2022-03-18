import { ReactNode } from 'react';

export interface ModalProp {
  isOpen: boolean;
  onClose?(): void;
  children: ReactNode;
  padding?: string;
  title?: string;
  background?: string;
  showCloseButton?: boolean;
}

export enum InternalState {
  Init,
  Open,
  Close,
  Dispose,
}

export interface OverlayProp {
  zIndex: number;
}

export interface ModalRootProp {
  background: string;
  padding: string;
  zIndex: number;
}
