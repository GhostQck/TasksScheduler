'use client';

import { InputCounter } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { ArrowDown, CirclePlus, SavePlus } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';

type ShiftTemplate = {
  id: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

type ShiftDraftState = {
  availablePool: ShiftTemplate[];
  daySchedule: ShiftTemplate[];
};

interface ShiftManagerModalProps {
  selectedDate: string;
  initAvailablePool: ShiftTemplate[];
  initDaySchedule: ShiftTemplate[];
  onSave: (data: ShiftDraftState) => Promise<void>;
}

export default function ShiftManagerModal({
  selectedDate,
  initAvailablePool,
  initDaySchedule,
  onSave,
}: ShiftManagerModalProps) {
  const [initState] = useState<ShiftDraftState>(() => ({
    availablePool: initAvailablePool,
    daySchedule: initDaySchedule,
  }));

  const [draft, setDraft] = useState<ShiftDraftState>(initState);

  const hasChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(initState),
    [draft, initState]
  );

  const tempIdCounter = useRef(-1);

  const handleCreateTemplate = (newShift: Omit<ShiftTemplate, 'id'>) => {
    const created: ShiftTemplate = {
      ...newShift,
      id: tempIdCounter.current--,
    };

    setDraft(prev => ({
      ...prev,
      availablePool: [...prev.availablePool, created]
    }));
  };

  const handleDeleteFromPool = (id: number) => {
    setDraft(prev => ({
      ...prev,
      availablePool: prev.availablePool.filter(item => item.id !== id)
    }));
  };

  const handleAssignToDay = (shift: ShiftTemplate) => {
    setDraft(prev => ({
      ...prev,
      daySchedule: [...prev.daySchedule, shift],
    }))
  };

  const handleRemoveFromDay = (id: number) => {
    setDraft(prev => ({
      ...prev,
      daySchedule: prev.daySchedule.filter(item => item.id !== id),
    }));
  };

  const handleSave = async () => {
    await onSave(draft);
  };

  return (
    <div className='flex flex-col gap-2 w-4xl'>
      <div className={`absolute bottom-5 ${!hasChanges && 'hidden'}`}>
        <span className='flex flex-row items-center gap-1 w-full text-sm text-txt-200/60 pointer-events-none select-none'>
          Unsaved Changes!
          <SavePlus size={20} strokeWidth={1} />
        </span>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <div className='p-2 bg-bg-800 rounded-lg inset-shadow-lg'>
          <h2 className='font-bold select-none'>
            New Shift Template:
            <CreateShiftForm onCreate={handleCreateTemplate} />
          </h2>
        </div>

        <div className='p-2 bg-bg-800 rounded-lg inset-shadow-lg'>
          <h2 className='font-bold select-none'>
            Available Templates:
          </h2>
        </div>

        <div className='p-2 bg-bg-800 rounded-lg inset-shadow-lg'>
          <h2 className='font-bold select-none'>
            Schedule for the Day:
          </h2>
        </div>
      </div>
    </div>
  );
}

interface CreateShiftFormProps {
  onCreate: (shift: Omit<ShiftTemplate, 'id'>) => void;
}

function CreateShiftForm({ onCreate }: CreateShiftFormProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const startHour = formData.get('startHour') as string;
    const startMinute = formData.get('startMinute') as string;
    const endHour = formData.get('endHour') as string;
    const endMinute = formData.get('endMinute') as string;

    onCreate({
      startHour: Number(startHour) || 0,
      startMinute: Number(startMinute) || 0,
      endHour: Number(endHour) || 0,
      endMinute: Number(endMinute) || 0,
    });

    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='pt-2 flex flex-col'
    >
      <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-semibold'>
        <InputCounter
          labelText=''
          min={0}
          max={23}
          name='startHour'
        />

        <p className='font-bold'>:</p>

        <InputCounter
          labelText=''
          min={0}
          max={59}
          name='startMinute'
        />
      </div>

      <p className='flex w-full justify-center'>
        <ArrowDown />
      </p>

      <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-semibold'>
        <InputCounter
          labelText=''
          min={0}
          max={23}
          name='endHour'
        />

        <p className='font-bold'>:</p>

        <InputCounter
          labelText=''
          min={0}
          max={59}
          name='endMinute'
        />
      </div>

      <Button
        type='submit'
        className='mt-2 font-semibold gap-1'
      >
        Add Template
        <CirclePlus size={20} />
      </Button>
    </form>
  );
}

interface AvailableShiftsPoolProps {
  shifts: ShiftTemplate[];
  onDelete: (id: number) => void;
  onAssign: (shift: ShiftTemplate) => void;
}

function AvailableShiftsPool({
  shifts,
  onDelete,
  onAssign,
}: AvailableShiftsPoolProps) {
  return (
    <div className='flex flex-col'>
      {shifts.map(shift => (
        <div
          key={shift.id}
          draggable
        >

        </div>
      ))}
    </div>
  );
}