'use client';

import { useModal } from '@/components/modals/ModalContext';
import { Button } from '@/components/ui/button';
import { Info, ShieldBan, Trash2, UserRoundPlus, LockKeyholeOpen } from 'lucide-react';
import { NewExpertForm } from './modal_forms';
import { activateExpertAction, deactivateExpertAction, deleteExpertAction } from './actions';
import { useRouter } from 'next/navigation';
import ShiftManagerModal from './modal_shift_manager';

interface ExpertPayload {
  expertId: string;
  expertName: string;
}

interface ExpertInfoPayload extends ExpertPayload {
  addedBy: string;
  addedDate: string;
}

export const NewExpertButton = () => {
  const { openModal, closeModal } = useModal();

  const onClick = () => openModal({
    type: 'form',
    title: 'Add new expert',
    confirmLabel: 'Add',
    content: formId => (
      <NewExpertForm
        formId={formId}
        onSuccess={closeModal}
      />
    ),
  });

  return (
    <Button
      className='peer'
      intent='create'
      onClick={onClick}
    >
      <UserRoundPlus className='-translate-y-[5%] translate-x-[5%]' strokeWidth={2} />
    </Button>
  );
};

export const InfoButton = ({
  expertId,
  expertName,
  addedBy,
  addedDate,
}: ExpertInfoPayload) => {
  const { openModal } = useModal();

  const onClick = () => openModal({
    type: 'info',
    title: `${expertName} details`,
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
  const router = useRouter();
  const { openModal } = useModal();

  // const onClick = () => openModal({
  //   type: 'confirm',
  //   title: `Deactivate ${expertName}?`,
  //   description: `If you deactivate ${expertName}, their instance will be hidden from the expert list for everyone.`,
  //   isDanger: true,
  //   onConfirm: async () => {
  //     const state = await deactivateExpertAction(expertId);
  //     router.push(`/experts?notify=${state.notify || 'unknown'}&value=${state.name || 'Expert'}`);
  //   },
  // });

  const onClick = () => openModal({
    type: 'form',
    title: 'Edit Schedule',
    confirmLabel: 'Save',
    content: formId => (
      <ShiftManagerModal
        selectedDate='09.08.0226'
        initAvailablePool={[{
          id: 1,
          startHour: 18,
          startMinute: 30,
          endHour: 4,
          endMinute: 54,
        }]}
        initDaySchedule={[{
          id: 1,
          startHour: 18,
          startMinute: 30,
          endHour: 4,
          endMinute: 54,
        }]}
        onSave={async () => console.log(5)}
      />
    ),
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
  const router = useRouter();
  const { openModal } = useModal();

  const onClick = () => openModal({
    type: 'confirm',
    title: `Delete ${expertName}?`,
    description: `If you delete ${expertName}, they will be completely erased from the database alongside any other instance connected to them.`,
    isDanger: true,
    confirmLabel: 'Delete',
    onConfirm: async () => {
      const state = await deleteExpertAction(expertId);
      router.push(`/experts?notify=${state.notify || 'unknown'}&value=${state.name || 'Expert'}`);
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

export const ActivateButton = ({ expertId, expertName }: ExpertPayload) => {
  const router = useRouter();
  const { openModal } = useModal();

  const onClick = () => openModal({
    type: 'confirm',
    title: `Activate ${expertName}?`,
    description: `If you activate ${expertName}, their instance will be shown within the expert list for everyone.`,
    isDanger: true,
    onConfirm: async () => {
      const state = await activateExpertAction(expertId);
      router.push(`/experts?notify=${state.notify || 'unknown'}&value=${state.name || 'Expert'}`);
    },
  });

  return (
    <Button
      intent='square'
      onClick={onClick}
    >
      <LockKeyholeOpen size={20} strokeWidth={2} />
    </Button>
  );
};