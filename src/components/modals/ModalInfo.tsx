'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { ModalInfoOptions, toggleDialog } from './modal_utils';

interface ModalInfoProps extends Omit<ModalInfoOptions, 'type'> {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalInfo({
  isOpen,
  title,
  description = '',
  cancelLabel = 'Cancel',
  onClose
}: ModalInfoProps) {
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
      
    if (isClickOut) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      className='fixed inset-0 z-50 m-auto max-w-md w-full rounded-xl bg-bg border border-bg-200 p-4 text-txt shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm'
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

      {description !== '' && typeof description === 'object' ? Object.keys(description).map(key => (
        <p key={key} className='text-sm text-txt-200 mt-3 leading-relaxed'>
          <span className='font-bold'>
            {`${key}: `}
          </span>
          {description[key]}
        </p>
      )) : (
        <p className='text-sm text-txt-200 mt-3 leading-relaxed'>
          {description}
        </p>
      )}

      <div className='flex items-center justify-end gap-3 mt-6'>
        <Button
          onClick={onClose}
          className='shadow-none bg-bg hover:bg-bg-400 hover:shadow-none'
        >{cancelLabel}</Button>
      </div>
    </dialog>
  );
}