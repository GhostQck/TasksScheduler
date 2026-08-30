'use client';

import { Play } from 'lucide-react';
import { useState, useId } from 'react';

interface SwitchProps {
  inputName: string;
  defaultState?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch = ({
  inputName,
  defaultState = false,
  onChange,
}: SwitchProps) => {
  const [state, setState] = useState(defaultState);

  const toggle = () => {
    const nextState = !state;
    setState(nextState);
    if (onChange) onChange(nextState);
  };

  return (
    <div className='inline-flex items-center gap-3 cursor-pointer shadow-md select-none'>
      <button
        type='button'
        role='switch'
        aria-checked={state}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full cursor-pointer transition-all duration-200 ease-in-out focus:outline-none hover:ring-2 hover:ring-txt hover:ring-offset-2 hover:ring-offset-bg-800 ${state ? 'bg-txt' : 'bg-bg-200'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md cursor-pointer transition duration-200 ease-in-out ${state ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>

      <input
        type='hidden'
        name={inputName}
        value={state ? 'true' : 'false'}
      />
    </div>
  );
};

interface SwitchSelectProps extends SwitchProps {
  textLeft: string;
  textRight: string;
  id?: string;
}

export const SwitchSelect = ({
  inputName,
  defaultState = false,
  textLeft,
  textRight,
  id,
  onChange,
}: SwitchSelectProps) => {
  const [state, setState] = useState(defaultState);

  const customId = useId();
  const activeId = id ? id : customId;

  const toggle = () => {
    const nextState = !state;
    setState(nextState);
    if (onChange) onChange(nextState);
  };

  return (
    <div className='flex flex-row gap-2 items-center'>
      <label htmlFor={activeId} className='font-bold'>
        {textLeft}
      </label>

      <button
        id={activeId}
        type='button'
        role='switch'
        aria-checked={state}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full cursor-pointer transition-all duration-200 ease-in-out focus:outline-none hover:ring-2 hover:ring-txt hover:ring-offset-2 hover:ring-offset-bg-800 ${state ? 'bg-txt' : 'bg-bg-200'}`}
      >
        <span className={`flex items-center justify-center h-4 w-4 transform rounded-full bg-white shadow-md cursor-pointer transition duration-200 ease-in-out ${state ? 'translate-x-6' : 'translate-x-1'}`}>
          <Play strokeWidth={3} className={`w-2.5 h-2.5 text-bg transition-transform duration-200 ${state ? 'rotate-0' : 'rotate-180'}`} />
        </span>
      </button>

      <label htmlFor={activeId} className='font-bold'>
        {textRight}
      </label>

      <input
        type='hidden'
        name={inputName}
        value={state ? 'true' : 'false'}
      />
    </div>
  );
};