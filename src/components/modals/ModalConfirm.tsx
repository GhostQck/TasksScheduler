'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/button';

export interface ModalConfirmBase {
  title: string;
  description?: string;
  isDanger?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

export interface ModalConfirmProps extends ModalConfirmBase {
  isOpen: boolean;
}

export default function ModalConfirm({
  isOpen,
  isDanger = false,
  title,
  description = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ModalConfirmProps) {
  if (!isOpen) return null;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen !== dialog.open) toggleDialog(dialog);
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();

    const isClickOut =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
      
    if (isClickOut) onCancel();
  };

  const onSuccess = () => {
    onConfirm();
    onCancel();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onClick={handleClick}
      className='fixed inset-0 z-50 m-auto max-w-md w-full rounded-xl bg-bg border border-bg-200 p-4 text-txt shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm'
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center gap-4'>
          {isDanger && (
            <div className='p-2 rounded-lg bg-neg/10 border border-neg-400/20 text-neg-400'>
              <AlertTriangle className='' />
            </div>
          )}
          <h3 className='text-lg font-semibold text-white'>
            {title}
          </h3>
        </div>

        <Button
          intent='square'
          onClick={onCancel}
          className='shadow-none bg-bg text-txt-200 hover:text-txt hover:bg-bg-400 hover:shadow-none transition-colors'
        >
          <X />
        </Button>
      </div>

      {description !== '' && (
        <p className='text-sm text-txt-200 mt-3 leading-relaxed'>
          {description}
        </p>
      )}

      <div className='flex items-center justify-end gap-3 mt-6'>
        <Button
          onClick={onCancel}
          className='shadow-none bg-bg hover:bg-bg-400 hover:shadow-none'
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={onSuccess}
        >
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}

function toggleDialog(dialog: HTMLDialogElement) {
  if (!dialog.open) dialog.showModal();
  else dialog.close();
}