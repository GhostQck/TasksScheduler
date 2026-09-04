'use client';

import { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { ModalFormOptions, toggleDialog } from './modal_utils';

interface ModalFormProps extends Omit<ModalFormOptions, 'type'> {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalForm({
  isOpen,
  title,
  confirmLabel = 'Submit',
  cancelLabel = 'Cancel',
  formId,
  content,
  onClose,
}: ModalFormProps) {
  if (!isOpen) return null;

  const generateId = useId();
  const activeId = formId || generateId;

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
      
    if (isClickOut) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      className='fixed inset-0 z-50 m-auto min-w-md rounded-xl bg-bg border border-bg-200 p-4 text-txt shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm'
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <h3 className='text-lg font-semibold text-white'>
            {title}
          </h3>
        </div>

        <Button
          intent='square'
          onClick={onClose}
          className='shadow-none bg-bg text-txt-200 hover:text-txt hover:bg-bg-400 hover:shadow-none transition-colors'
        >
          <X />
        </Button>
      </div>

      <div className='mt-4'>
        {content(activeId)}
      </div>

      <div className='flex items-center justify-end gap-3 mt-6'>
        <Button
          onClick={onClose}
          className='shadow-none bg-bg hover:bg-bg-400 hover:shadow-none'
        >
          {cancelLabel}
        </Button>

        <Button
          type='submit'
          form={activeId}
        >
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}