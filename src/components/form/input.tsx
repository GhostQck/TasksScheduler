import React, { useId, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputVars, labelVars } from './cva_tables';

import { Plus, Minus } from 'lucide-react';

import { Button } from '../ui/button';

interface InputProps
extends InputHTMLAttributes<HTMLInputElement>,
VariantProps<typeof inputVars> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  intent,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={cn(inputVars({ intent }), className)}
      {...props}
    />
  );
});
Input.displayName = 'Input';

interface LabelProps
extends LabelHTMLAttributes<HTMLLabelElement>,
VariantProps<typeof labelVars> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  className,
  intent,
  children,
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(labelVars({ intent }), className)}
      {...props}
    >{children}</label>
  );
});
Label.displayName = 'Label';

interface InputLabelProps extends Omit<InputProps, 'placeholder'> {
  wrapperCN?: string;
  labelCN?: string;
  labelText: string;
}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(({
  id,
  className,
  wrapperCN,
  labelCN,
  labelText,
  intent,
  ...props
}, ref) => {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={cn('relative', wrapperCN)}>
      <Input
        ref={ref}
        id={inputId}
        intent={intent}
        className={className}
        placeholder=' '
        {...props}
      />

      <Label
        htmlFor={inputId}
        intent={intent}
        className={labelCN}
      >{labelText}</Label>
    </div>
  );
});

interface InputCounterProps extends Omit<InputLabelProps, 'defaultValue' | 'type'> {
  startValue?: number;
  buttonCN?: string;
}

export const InputCounter = React.forwardRef<HTMLInputElement, InputCounterProps>(({
  id,
  className,
  buttonCN,
  wrapperCN,
  labelCN,
  labelText,
  startValue = 0,
  intent,
  ...props
}, ref) => {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={cn('relative', wrapperCN)}>
      <Input
        ref={ref}
        id={inputId}
        intent={intent}
        type='number'
        className={cn(
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        placeholder=' '
        defaultValue={startValue}
        {...props}
      />

      <Label
        htmlFor={inputId}
        intent={intent}
        className={labelCN}
      >{labelText}</Label>

      <div className='absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-3'>
        <Button
          type='button'
          intent='circle'
          className={buttonCN}
        ><Plus /></Button>

        <Button
          type='button'
          intent='circle'
          className={buttonCN}
        ><Minus /></Button>
      </div>
    </div>
  );
});