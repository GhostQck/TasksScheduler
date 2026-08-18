'use client';

import React, { createContext, useContext, useState } from 'react';
import ModalConfirm, { ModalConfirmBase } from './ModalConfirm';

interface ModalProviderProps extends Omit<ModalConfirmBase, 'onCancel'> {}

type OpenModalFunc = (options: ModalProviderProps) => void;
type CloseModalFunc = () => void;

interface ModalContextType {
  openModal: OpenModalFunc;
  closeModal: CloseModalFunc;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOptions, setModalOptions] = useState<ModalProviderProps | null>(null);

  const openModal: OpenModalFunc = options => {
    setModalOptions(options);
  };

  const closeModal: CloseModalFunc = () => {
    setModalOptions(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalOptions && (
        <ModalConfirm
          isOpen={modalOptions !== null}
          isDanger={modalOptions.isDanger}
          title={modalOptions.title}
          description={modalOptions.description}
          confirmLabel={modalOptions.confirmLabel}
          cancelLabel={modalOptions.cancelLabel}
          onConfirm={async () => {
            await modalOptions.onConfirm();
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};