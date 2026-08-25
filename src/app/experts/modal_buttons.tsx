'use client';

import { useModal } from '@/components/modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Info, ShieldBan, Trash2 } from 'lucide-react';

interface ExpertPayload {
  expertId: string;
  expertName: string;
}

interface ExpertInfoPayload extends ExpertPayload {
  addedBy: string;
  addedDate: string;
}

export const InfoButton = ({
  expertId,
  expertName,
  addedBy,
  addedDate,
}: ExpertInfoPayload) => {
  const { openModal } = useModal();

  const onClick = () => openModal({
    type: 'info',
    title: `${expertName} Details`,
    description: {
      'Added by': addedBy,
      'Added on': addedDate,
    },
  });

  return (
    <Button
      intent='square'
      onClick={onClick}
    >
      <Info size={20} strokeWidth={2} />
    </Button>
  );
};

export const DeactivateButton = ({ expertId, expertName }: ExpertPayload) => {
  const { openModal } = useModal();

  const onClick = () => openModal({
    type: 'confirm',
    title: `Deactivate ${expertName}?`,
    description: `If you deactivate ${expertName}, their instance will be hidden from the expert list for everyone.`,
    isDanger: true,
    onConfirm: async () => {
      console.log('deactivated ', expertId);
    },
  });

  return (
    <Button
      intent='square'
      onClick={onClick}
    >
      <ShieldBan size={20} strokeWidth={2} />
    </Button>
  );
};

export const DeleteButton = ({ expertId, expertName }: ExpertPayload) => {
  const { openModal } = useModal();

  const onClick = () => openModal({
    type: 'confirm',
    title: `Delete ${expertName}?`,
    description: `If you delete ${expertName}, they will be completely erased from the database alongside any other instance connected to them.`,
    isDanger: true,
    confirmLabel: 'Delete',
    onConfirm: async () => {
      console.log('deactivated ', expertId);
    },
  });

  return (
    <Button
      intent='square'
      onClick={onClick}
      className='bg-neg-800 text-neg-200 hover:bg-neg-600'
    >
      <Trash2 size={20} strokeWidth={2} />
    </Button>
  );
};