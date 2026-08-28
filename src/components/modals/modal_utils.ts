import React, { RefObject } from 'react';

interface ModalOptions {
  title: string;
  cancelLabel?: string;
}

export interface ModalConfirmOptions extends ModalOptions {
  type: 'confirm';
  description?: string;
  isDanger?: boolean;
  confirmLabel?: string;
  onConfirm: () => Promise<void> | void;
}

export interface ModalInfoOptions extends ModalOptions {
  type: 'info';
  description?: Record<string, string> | string;
}

export interface ModalFormOptions extends ModalOptions {
  type: 'form';
  confirmLabel?: string;
  formId?: string;
  content: (formId: string) => React.ReactNode;
}

export type AllModalOptions =
  ModalConfirmOptions 
  | ModalInfoOptions 
  | ModalFormOptions;

export const toggleDialog = (dialog: HTMLDialogElement) => {
  if (!dialog.open) dialog.showModal();
  else dialog.close();
}