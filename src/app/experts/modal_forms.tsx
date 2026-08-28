'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { newExpertAction, NewExpertFormState } from './actions';
import { Input, InputLabel } from '@/components/form/input';
import { ShieldX } from 'lucide-react';

const initNewExpertState: NewExpertFormState = {
  success: false,
  error: null,
  fields: {
    cxId: '',
    name: '',
  },
};

interface ExpertFormProps {
  formId: string;
  onSuccess: () => void;
}

export const NewExpertForm = ({
  formId,
  onSuccess,
}: ExpertFormProps) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    newExpertAction,
    initNewExpertState
  );

  useEffect(() => {
    if (state.success) {
      onSuccess();
      router.push('/experts?notify=expert_added');
    }
  }, [state.success, onSuccess]);

  return (
    <form id={formId} action={formAction}>
      {state.error && (
        <div className='mb-4 p-2 flex flex-row justify-start items-center gap-2 text-sm font-semibold rounded-lg bg-neg-200 border-2 border-neg-800 text-neg-800'>
          <ShieldX />
          {state.error}
        </div>
      )}

      <div className='grid grid-cols-2 w-full gap-4'>
        <InputLabel
          id='new_ex_cxid'
          name='cx_id'
          type='text'
          maxLength={10}
          labelText='CX ID'
          intent='transparent_bg'
          labelCN='text-slate-200'
          required
        />

        <InputLabel
          id='new_ex_name'
          name='name'
          type='text'
          maxLength={320}
          labelText='Name'
          intent='transparent_bg'
          labelCN='text-slate-200'
          required
        />
      </div>
    </form>
  );
};