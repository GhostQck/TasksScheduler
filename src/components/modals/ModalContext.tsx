'use client';

import React, { createContext, useContext, useState } from 'react';
import ModalConfirm from './ModalConfirm';
import ModalInfo from './ModalInfo';
import { AllModalOptions } from './modal_utils';
import ModalForm from './ModalForm';

interface ModalContextType {
  openModal: (options: AllModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOptions, setModalOptions] = useState<AllModalOptions | null>(null);

  const openModal = (options: AllModalOptions) => {
    setModalOptions(options);
  };

  const closeModal = () => {
    setModalOptions(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalOptions?.type === 'confirm' && (
        <ModalConfirm
          isOpen={true}
          isDanger={modalOptions.isDanger}
          title={modalOptions.title}
          description={modalOptions.description}
          confirmLabel={modalOptions.confirmLabel}
          cancelLabel={modalOptions.cancelLabel}
          onConfirm={async () => {
            await modalOptions.onConfirm();
            closeModal();
          }}
          onClose={closeModal}
        />
      )}

      {modalOptions?.type === 'info' && (
        <ModalInfo
          isOpen={true}
          title={modalOptions.title}
          description={modalOptions.description}
          onClose={closeModal}
        />
      )}

      {modalOptions?.type === 'form' && (
        <ModalForm
          isOpen={true}
          title={modalOptions.title}
          confirmLabel={modalOptions.confirmLabel}
          content={modalOptions.content}
          onClose={closeModal}
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